import { Card } from '@entities';
import { CardParams, CardID, BoardID } from '@types';

export interface CardRepository {
	// /api/boards/:boardID/cards
	createCard({
		boardID,
		title,
		description,
		type,
		order,
	}: CardParams): Promise<Card>;
	// /api/boards/:boardID/cards/:cardID
	updateCard({
		id,
		boardID,
		title,
		description,
		type,
		order,
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
