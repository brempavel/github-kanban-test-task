import { Board } from '@entities';
import { BoardID } from '@types';

export interface BoardRepository {
	// /api/boards/
	createBoard(name: string): Promise<Board>;
	// /api/boards/:id
	updateBoard({ id, name }: { id: BoardID; name: string }): Promise<Board>;
	// /api/boards/:id
	deleteBoard(id: BoardID): Promise<BoardID>;
	// /api/boards/:id
	getBoard(id: BoardID): Promise<Board>;
	// /api/boards
	getBoards(): Promise<Board[]>;
}
