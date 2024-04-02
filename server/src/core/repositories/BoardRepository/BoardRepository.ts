import { Board } from '@entities';
import { BoardID } from '@types';

export interface BoardRepository {
	// /api/boards/
	createBoard(title: string): Promise<Board>;

	// /api/boards/:id
	updateBoard({ id, title }: { id: BoardID; title: string }): Promise<Board>;

	// /api/boards/:id
	deleteBoard(id: BoardID): Promise<BoardID>;

	// /api/boards/:id
	getBoard(id: BoardID): Promise<Board>;
}
