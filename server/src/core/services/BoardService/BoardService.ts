import { BoardRepository } from '@repositories';
import { BoardID } from '@types';

export class BoardService {
	constructor(readonly boardRepository: BoardRepository) {}

	createBoard(title: string) {
		return this.boardRepository.createBoard(title);
	}

	updateBoard({ id, title }: { id: BoardID; title: string }) {
		return this.boardRepository.updateBoard({ id, title });
	}

	deleteBoard(id: BoardID) {
		return this.boardRepository.deleteBoard(id);
	}

	getBoard(id: BoardID) {
		return this.boardRepository.getBoard(id);
	}
}
