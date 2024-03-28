import { CardRepository } from '@repositories';
import { CardID, CardParams, BoardID } from '@types';

export class CardService {
	constructor(readonly boardRepository: CardRepository) {}

	createCard({ boardID, title, description, type, order }: CardParams) {
		return this.boardRepository.createCard({
			boardID,
			title,
			description,
			type,
			order,
		});
	}
	updateCard({
		boardID,
		title,
		description,
		id,
		type,
		order,
	}: CardParams & { id: CardID }) {
		return this.boardRepository.updateCard({
			boardID,
			title,
			description,
			id,
			type,
			order,
		});
	}
	deleteCard({ boardID, id }: { boardID: BoardID; id: CardID }) {
		return this.boardRepository.deleteCard({ boardID, id });
	}
}
