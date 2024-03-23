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
		if (!board) {
			throw new Error('Board does not exist');
		}
		board.name = name;
		await board.save();

		return {
			id: board.id,
			name,
			cards: await CardModel.find({ boardID: id }),
		};
	}

	async deleteBoard(id: BoardID): Promise<BoardID> {
		await BoardModel.deleteOne({ _id: id });

		return id;
	}

	async getBoard(id: BoardID): Promise<Board> {
		const board = await BoardModel.findOne({ _id: id });
		if (!board) {
			throw new Error('Board does not exist');
		}

		const cards = (await CardModel.find().where('_id').in(board.cardIDs)).map(
			({ id, title, description }) => {
				return { id, title, description };
			}
		);

		return {
			id,
			name: board.name,
			cards,
		};
	}

	async getBoards(): Promise<Board[]> {
		const boards = await BoardModel.find();
		if (!boards) {
			throw new Error('Boards does not exist');
		}

		const parsedBoards = Promise.all(
			boards.map(async ({ id, name, cardIDs }) => {
				const cards = (await CardModel.find().where('_id').in(cardIDs)).map(
					({ id, title, description }) => {
						return { id, title, description };
					}
				);

				return {
					id,
					name,
					cards,
				};
			})
		);

		return parsedBoards;
	}
}
