import { Card } from '@entities';
import { CardRepository } from '@repositories';
import { BoardID, CardID, CardParams } from '@types';
import { MongoRepository } from './MongoRepository';
import { CardModel } from './models/CardModel';
import { BoardModel } from './models/BoardModel';
import { ApiError } from '../../exceptions/ApiError';

export class MongoCardRepository implements CardRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createCard({
		boardID,
		type,
		order,
		title = '',
		description = '',
	}: CardParams): Promise<Card> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const cardModel = new CardModel({ title, description, type, order });
		const card = await cardModel.save();

		board.cardIDs.push(card._id);
		await board.save();

		return { id: card.id, title, description, type, order };
	}

	async updateCard({
		id,
		boardID,
		type,
		order,
		title = '',
		description = '',
	}: CardParams & { id: CardID }): Promise<Card> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw ApiError.BadRequest('Card does not exist');
		}

		const isCardOnBoard = board.cardIDs.includes(card.id);
		if (!isCardOnBoard) {
			throw ApiError.BadRequest('Such card does not exist on this board');
		}

		if (title !== '') card.title = title;
		if (description !== '') card.description = description;
		if (type) card.type = type;
		if (order) card.order = order;
		await card.save();

		return {
			id,
			title: card.title,
			description: card.description,
			type,
			order,
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
			throw ApiError.BadRequest('Board does not exist');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw ApiError.BadRequest('Card does not exist');
		}

		const isCardOnBoard = board.cardIDs.includes(card.id);
		if (!isCardOnBoard) {
			throw ApiError.BadRequest('Such card does not exist on this board');
		}

		board.cardIDs = board.cardIDs.filter((cardID) => cardID.toString() !== id);
		await board.save();

		await CardModel.deleteOne({ _id: id });

		return id;
	}
}
