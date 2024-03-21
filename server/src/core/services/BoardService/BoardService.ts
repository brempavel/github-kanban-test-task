import { BoardRepository } from '@repositories';
import { BoardID } from '@types';

export class BoardService {
	constructor(readonly boardRepository: BoardRepository) {}

	createBoard(name: string) {
		return this.boardRepository.createBoard(name);
	}
	updateBoard({ id, name }: { id: BoardID; name: string }) {
		return this.boardRepository.updateBoard({ id, name });
	}
	deleteBoard(id: BoardID) {
		return this.boardRepository.deleteBoard(id);
	}
	getBoard(id: BoardID) {
		return this.boardRepository.getBoard(id);
	}
	getBoards() {
		return this.boardRepository.getBoards();
	}
}
