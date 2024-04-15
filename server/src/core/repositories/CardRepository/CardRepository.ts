import { Card } from '@entities';
import { CardParams, CardID, ColumnID, BoardID } from '@types';

export interface CardRepository {
	// /api/boards/:boardID/columns/:columnID/cards
	createCard({
		boardID,
		columnID,
		title,
		description,
		order,
	}: CardParams): Promise<Card>;

	// /api/boards/:boardID/columns/:columnID/cards/:cardID
	updateCard({
		boardID,
		id,
		columnID,
		title,
		description,
		order,
	}: CardParams & { id: CardID }): Promise<Card>;

	// /api/boards/:boardID/columns/:columnID/cards/:cardID
	deleteCard({
		boardID,
		columnID,
		id,
	}: {
		boardID: BoardID;
		columnID: ColumnID;
		id: CardID;
	}): Promise<CardID>;

	// /api/boards/:boardID/columns/:columnID/cards/:cardID
	changeColumn({
		boardID,
		columnID,
		order,
	}: Omit<CardParams, 'title' | 'description'> & {
		id: CardID;
		newColumnID: ColumnID;
	}): Promise<Card>;
}
