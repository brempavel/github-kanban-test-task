import { Column } from '@entities';
import { BoardID, ColumnID, ColumnParams } from '@types';

export interface ColumnRepository {
	// /api/boards/:boardID/columns
	createColumn({ boardID, title, order }: ColumnParams): Promise<Column>;

	// /api/boards/:boardID/columns/:columnID
	updateColumn({
		boardID,
		title,
		order,
	}: ColumnParams & { id: ColumnID }): Promise<Column>;

	// /api/boards/:boardID/columns/:columnID
	deleteColumn({
		boardID,
		id,
	}: {
		boardID: BoardID;
		id: ColumnID;
	}): Promise<ColumnID>;
}
