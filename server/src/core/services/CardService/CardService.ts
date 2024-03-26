import { CardRepository } from '@repositories';
import { CardID, CardParams, BoardID } from '@types';

export class CardService {
	constructor(readonly boardRepository: CardRepository) {}

	createCard({ boardID, title, description, type }: CardParams) {
		return this.boardRepository.createCard({
			boardID,
			title,
			description,
			type,
		});
	}
	updateCard({
		boardID,
		title,
		description,
		id,
		type,
	}: CardParams & { id: CardID }) {
		return this.boardRepository.updateCard({
			boardID,
			title,
			description,
			id,
			type,
		});
	}
	deleteCard({ boardID, id }: { boardID: BoardID; id: CardID }) {
		return this.boardRepository.deleteCard({ boardID, id });
	}
}
