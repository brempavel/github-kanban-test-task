import { Column } from '@entities';
import { ColumnRepository } from '@repositories';
import { ColumnParams } from '@types';
import { MongoRepository } from './MongoRepository';
import { BoardModel } from './models/BoardModel';
import { ApiError } from '../../exceptions/ApiError';
import { ColumnModel } from './models/ColumnModel';
import { CardModel } from './models/CardModel';

export class MongoColumnRepository implements ColumnRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createColumn({ boardID, title, order }: ColumnParams): Promise<Column> {
		console.log(boardID, title, order);
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const columnModel = new ColumnModel({ title, order });
		const column = await columnModel.save();
		console.log(column);

		board.columnIDs.push(column.id);
		await board.save();

		return {
			id: column.id,
			title,
			order,
			cards: [],
		};
	}

	async updateColumn({
		boardID,
		title,
		order,
		id,
	}: ColumnParams & { id: string }): Promise<Column> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const column = await ColumnModel.findOne({ _id: id });
		if (!column) {
			throw ApiError.BadRequest('Column does not exist');
		}

		const isColumnOnBoard = board.columnIDs.includes(column.id);
		if (!isColumnOnBoard) {
			throw ApiError.BadRequest('Such column does not exist on this board');
		}

		if (title) column.title = title;
		if (order) column.order = order;
		await column.save();

		const cards = await Promise.all(
			(
				await CardModel.find().where('_id').in(column.cardIDs)
			).map(({ id, title, description, order }) => ({
				id,
				title,
				description,
				order,
			}))
		);

		return {
			id,
			title: column.title,
			order: column.order,
			cards,
		};
	}

	async deleteColumn({
		boardID,
		id,
	}: {
		boardID: string;
		id: string;
	}): Promise<string> {
		const board = await BoardModel.findOne({ _id: boardID });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const column = await ColumnModel.findOne({ _id: id });
		if (!column) {
			throw ApiError.BadRequest('Column does not exist');
		}

		const isColumnOnBoard = board.columnIDs.includes(column.id);
		if (!isColumnOnBoard) {
			throw ApiError.BadRequest('Such column does not exist on this board');
		}

		board.columnIDs = board.columnIDs.filter(
			(columnID) => columnID.toString() !== id
		);
		await board.save();

		await ColumnModel.deleteOne({ _id: id });

		return id;
	}
}
