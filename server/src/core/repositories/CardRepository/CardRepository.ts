import { Card } from '@entities';
import { CardParams, CardID, BoardID } from '@types';

export interface CardRepository {
	// /api/boards/:boardID/cards/new
	createCard({ boardID, title, description }: CardParams): Promise<Card>;
	// /api/boards/:boardID/cards/:cardID
	updateCard({
		id,
		boardID,
		title,
		description,
	}: CardParams & { id: CardID }): Promise<Card>;
	// /api/boards/:boardID/cards/:cardID
	deleteCard({
		boardID,
		id,
	}: {
		boardID: BoardID;
		id: CardID;
	}): Promise<CardID>;
}
