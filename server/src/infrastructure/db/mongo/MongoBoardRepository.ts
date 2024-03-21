import { Board } from '@entities';
import { BoardRepository } from '@repositories';
import { BoardID } from '@types';
import { MongoRepository } from './MongoRepository';
import { CardModel } from './models/CardModel';
import { BoardModel } from './models/BoardModel';

export class MongoBoardRepository implements BoardRepository {
	constructor() {
		MongoRepository.getInstance();
	}

	async createBoard(name: string): Promise<Board> {
		const boardModel = new BoardModel({ name });
		const board = await boardModel.save();
		return { id: board.id, name, cards: [] };
	}

	async updateBoard({
		id,
		name,
	}: {
		id: BoardID;
		name: string;
	}): Promise<Board> {
		const board = await BoardModel.findOne({ _id: id });
		if (board) {
			board.name = name;
			await board.save();
		} else {
			throw new Error('Board does not exist');
		}

		return {
			id: board.id,
			name,
			cards: await CardModel.find({ boardID: id }),
		};
	}

	async deleteBoard(id: BoardID): Promise<BoardID> {
		const board = await BoardModel.findOne({ _id: id });
		await board.deleteOne();
		return id;
	}

	async getBoard(id: BoardID): Promise<Board> {
		const board = await BoardModel.findOne({ _id: id });
		if (board) {
			return {
				id,
				name: board.name,
				cards: await CardModel.find({ boardID: id }),
			};
		} else {
			throw new Error('Board does not exist');
		}
	}
}
