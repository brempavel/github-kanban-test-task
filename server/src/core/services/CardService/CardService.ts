import { CardRepository } from '@repositories';
import { BoardID, CardID, CardParams, ColumnID } from '@types';

export class CardService {
	constructor(readonly cardRepository: CardRepository) {}

	createCard({ boardID, columnID, title, description, order }: CardParams) {
		return this.cardRepository.createCard({
			boardID,
			columnID,
			title,
			description,
			order,
		});
	}

	updateCard({
		boardID,
		columnID,
		title,
		description,
		id,
		order,
	}: CardParams & { id: CardID }) {
		return this.cardRepository.updateCard({
			boardID,
			columnID,
			title,
			description,
			id,
			order,
		});
	}

	deleteCard({
		boardID,
		columnID,
		id,
	}: {
		boardID: BoardID;
		columnID: ColumnID;
		id: CardID;
	}) {
		return this.cardRepository.deleteCard({ boardID, columnID, id });
	}

	changeColumn({
		id,
		boardID,
		columnID,
		newColumnID,
		order,
	}: Omit<CardParams, 'title' | 'description'> & {
		id: CardID;
		newColumnID: ColumnID;
	}) {
		return this.cardRepository.changeColumn({
			id,
			boardID,
			columnID,
			newColumnID,
			order,
		});
	}
}
