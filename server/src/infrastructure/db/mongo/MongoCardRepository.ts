import { Card } from '@entities';
import { CardRepository } from '@repositories';
import { BoardID, CardID, CardParams } from '@types';
import { MongoRepository } from './MongoRepository';
import { CardModel } from './models/CardModel';
import { BoardModel } from './models/BoardModel';

export class MongoCardRepository implements CardRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createCard({
		boardID,
		title = '',
		description = '',
	}: CardParams): Promise<Card> {
		const cardModel = new CardModel({ title, description });
		const card = await cardModel.save();
		const board = await BoardModel.findOne({ _id: boardID });
		if (board) {
			board.cardIDs.push(card._id);
			await board.save();
		} else {
			throw new Error('Board does not exist');
		}

		return { id: card.id, title, description };
	}

	async updateCard({
		id,
		boardID,
		title = '',
		description = '',
	}: CardParams & { id: CardID }): Promise<Card> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw new Error('Board does not exist');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw new Error('Card does not exist');
		}

		const isCardOnBoard = board.cardIDs.includes(card.id);
		if (!isCardOnBoard) {
			throw new Error('Such card does not exist on this board');
		}

		if (title !== '') card.title = title;
		if (description !== '') card.description = description;
		await card.save();

		return {
			id,
			title: card.title,
			description: card.description,
		};
	}

	async deleteCard({
		boardID,
		id,
	}: {
		boardID: BoardID;
		id: CardID;
	}): Promise<CardID> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw new Error('Board does not exist');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw new Error('Card does not exist');
		}

		const isCardOnBoard = board.cardIDs.includes(card.id);
		if (!isCardOnBoard) {
			throw new Error('Such card does not exist on this board');
		}

		board.cardIDs = board.cardIDs.filter((cardID) => cardID.toString() !== id);
		await board.save();

		await card.deleteOne();
		return id;
	}
}
