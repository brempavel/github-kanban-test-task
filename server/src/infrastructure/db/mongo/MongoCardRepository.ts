import { Card } from '@entities';
import { CardRepository } from '@repositories';
import { BoardID, CardID, CardParams, ColumnID } from '@types';
import { MongoRepository } from './MongoRepository';
import { CardModel } from './models/CardModel';
import { BoardModel } from './models/BoardModel';
import { ApiError } from '../../exceptions/ApiError';
import { ColumnModel } from './models/ColumnModel';

export class MongoCardRepository implements CardRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createCard({
		boardID,
		columnID,
		order,
		title = '',
		description = '',
	}: CardParams): Promise<Card> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const column = await ColumnModel.findOne({ _id: columnID });
		if (!column) {
			throw ApiError.BadRequest('Column does not exist');
		}

		const isColumnOnBoard = board.columnIDs.includes(column.id);
		if (!isColumnOnBoard) {
			throw ApiError.BadRequest('Such column does not exist on this board');
		}

		const cardModel = new CardModel({ title, description, order });
		const card = await cardModel.save();

		column.cardIDs.push(card.id);
		await column.save();

		return {
			id: card.id,
			title,
			description,
			order,
		};
	}

	async updateCard({
		boardID,
		columnID,
		id,
		order,
		title = '',
		description = '',
	}: CardParams & { id: CardID }): Promise<Card> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const column = await ColumnModel.findOne({ _id: columnID });
		if (!column) {
			throw ApiError.BadRequest('Column does not exist');
		}

		const isColumnOnBoard = board.columnIDs.includes(column.id);
		if (!isColumnOnBoard) {
			throw ApiError.BadRequest('Such column does not exist on this board');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw ApiError.BadRequest('Card does n ot exist');
		}

		const isCardOnColumn = column.cardIDs.includes(card.id);
		if (!isCardOnColumn) {
			throw ApiError.BadRequest('Such card does not exist on this column');
		}

		if (title) card.title = title;
		if (description) card.description = description;
		if (order) card.order = order;
		await card.save();

		return {
			id,
			title: card.title,
			description: card.description,
			order: card.order,
		};
	}

	async deleteCard({
		boardID,
		columnID,
		id,
	}: {
		boardID: BoardID;
		columnID: ColumnID;
		id: CardID;
	}): Promise<CardID> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const column = await ColumnModel.findOne({ _id: columnID });
		if (!column) {
			throw ApiError.BadRequest('Column does not exist');
		}

		const isColumnOnBoard = board.columnIDs.includes(column.id);
		if (!isColumnOnBoard) {
			throw ApiError.BadRequest('Such column does not exist on this board');
		}

		const card = await CardModel.findOne({ _id: id });
		if (!card) {
			throw ApiError.BadRequest('Card does not exist');
		}

		const isCardOnColumn = column.cardIDs.includes(card.id);
		if (!isCardOnColumn) {
			throw ApiError.BadRequest('Such card does not exist on this column');
		}

		column.cardIDs = column.cardIDs.filter(
			(cardID) => cardID.toString() !== id
		);
		await column.save();

		await CardModel.deleteOne({ _id: id });

		return id;
	}
}
