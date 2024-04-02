import { ColumnRepository } from '@repositories';
import { BoardID, ColumnID, ColumnParams } from '@types';

export class ColumnService {
	constructor(readonly columnRepository: ColumnRepository) {}

	createColumn({ boardID, title, order }: ColumnParams) {
		return this.columnRepository.createColumn({
			boardID,
			title,
			order,
		});
	}

	updateColumn({ boardID, title, order, id }: ColumnParams & { id: ColumnID }) {
		return this.columnRepository.updateColumn({
			boardID,
			title,
			order,
			id,
		});
	}

	deleteColumn({ boardID, id }: { boardID: BoardID; id: ColumnID }) {
		return this.columnRepository.deleteColumn({ boardID, id });
	}
}
