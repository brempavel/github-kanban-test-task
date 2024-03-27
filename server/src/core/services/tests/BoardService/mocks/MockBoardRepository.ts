import { Board } from '@entities';
import { BoardRepository } from '@repositories';
import { BoardID } from '@types';

export class MockBoardRepository implements BoardRepository {
	private boards: Board[] = [];

	async createBoard(name: string): Promise<Board> {
		const board: Board = {
			id: Math.floor(Math.random() * 100).toString(),
			name,
			cards: [],
		};
		this.boards.push(board);

		return board;
	}

	async updateBoard({
		id,
		name,
	}: {
		id: BoardID;
		name: string;
	}): Promise<Board> {
		const boardIndex = this.boards.findIndex((board) => board.id === id);
		if (boardIndex === -1) {
			throw new Error('Board not found');
		}
		this.boards[boardIndex] = { ...this.boards[boardIndex], name };

		return this.boards[boardIndex];
	}

	async deleteBoard(id: BoardID): Promise<BoardID> {
		const boardIndex = this.boards.findIndex((board) => board.id === id);
		if (boardIndex === -1) {
			throw new Error('Board not found');
		}
		this.boards.splice(boardIndex, 1);

		return id;
	}

	async getBoard(id: BoardID): Promise<Board> {
		const board = this.boards.find((board) => board.id === id);
		if (!board) {
			throw new Error('Board not found');
		}

		return board;
	}

	async getBoards(): Promise<Board[]> {
		return this.boards;
	}
}
