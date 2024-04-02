import { Board } from '@entities';
import { BoardRepository } from '@repositories';
import { BoardID } from '@types';
import { MongoRepository } from './MongoRepository';
import { BoardModel } from './models/BoardModel';
import { CardModel } from './models/CardModel';
import { ColumnModel } from './models/ColumnModel';
import { ApiError } from '../../exceptions/ApiError';

export class MongoBoardRepository implements BoardRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createBoard(title: string): Promise<Board> {
		const boardModel = new BoardModel({ title });
		const board = await boardModel.save();

		return { id: board.id, title, columns: [] };
	}

	async updateBoard({
		id,
		title,
	}: {
		id: BoardID;
		title: string;
	}): Promise<Board> {
		const board = await BoardModel.findOne({ _id: id });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		board.title = title;
		await board.save();

		const columns = await Promise.all(
			(
				await ColumnModel.find().where('_id').in(board.columnIDs)
			).map(async ({ id, title, order, cardIDs }) => {
				const cards = (await CardModel.find().where('_id').in(cardIDs)).map(
					({ id, title, description, order }) => ({
						id,
						title,
						description,
						order,
					})
				);
				return { id, title, order, cards };
			})
		);

		return {
			id: board.id,
			title,
			columns,
		};
	}

	async deleteBoard(id: BoardID): Promise<BoardID> {
		const board = await BoardModel.findOne({ _id: id });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		await BoardModel.deleteOne({ _id: id });

		return id;
	}

	async getBoard(id: BoardID): Promise<Board> {
		const board = await BoardModel.findOne({ _id: id });
		if (!board) {
			throw ApiError.BadRequest('Board does not exist');
		}

		const columns = await Promise.all(
			(
				await ColumnModel.find().where('_id').in(board.columnIDs)
			).map(async ({ id, title, order, cardIDs }) => {
				const cards = (await CardModel.find().where('_id').in(cardIDs)).map(
					({ id, title, description, order }) => ({
						id,
						title,
						description,
						order,
					})
				);
				return { id, title, order, cards };
			})
		);

		return {
			id,
			title: board.title,
			columns,
		};
	}
}
