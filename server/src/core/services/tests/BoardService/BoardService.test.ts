import { BoardService } from '../..';
import { MockBoardRepository } from './mocks/MockBoardRepository';

describe('BoardService', () => {
	let boardService: BoardService;
	let mockBoardRepository: MockBoardRepository;

	beforeEach(() => {
		mockBoardRepository = new MockBoardRepository();
		boardService = new BoardService(mockBoardRepository);
	});

	describe('createBoard', () => {
		it('should create a new board', async () => {
			const boardName = 'Test Board';
			const createdBoard = await boardService.createBoard(boardName);

			expect(createdBoard.name).toBe(boardName);
			expect(createdBoard.id).toBeTruthy();
		});
	});

	describe('updateBoard', () => {
		it('should update the name of an existing board', async () => {
			const boardName = 'Updated Board Name';
			const existingBoard = await mockBoardRepository.createBoard(
				'Old Board Name'
			);
			const updatedBoard = await boardService.updateBoard({
				id: existingBoard.id,
				name: boardName,
			});

			expect(updatedBoard.name).toBe(boardName);
			expect(updatedBoard.id).toBe(existingBoard.id);
		});

		it('should throw an error if the board does not exist', async () => {
			await expect(
				boardService.updateBoard({ id: 'non-existing-id', name: 'New Name' })
			).rejects.toThrow('Board not found');
		});
	});

	describe('deleteBoard', () => {
		it('should delete an existing board', async () => {
			const existingBoard = await mockBoardRepository.createBoard('Test Board');
			const deletedBoardId = await boardService.deleteBoard(existingBoard.id);

			expect(deletedBoardId).toBe(existingBoard.id);
		});

		it('should throw an error if the board does not exist', async () => {
			await expect(boardService.deleteBoard('non-existing-id')).rejects.toThrow(
				'Board not found'
			);
		});
	});

	describe('getBoard', () => {
		it('should retrieve an existing board by ID', async () => {
			const existingBoard = await mockBoardRepository.createBoard('Test Board');
			const retrievedBoard = await boardService.getBoard(existingBoard.id);

			expect(retrievedBoard.id).toBe(existingBoard.id);
			expect(retrievedBoard.name).toBe(existingBoard.name);
		});

		it('should throw an error if the board does not exist', async () => {
			await expect(boardService.getBoard('non-existing-id')).rejects.toThrow(
				'Board not found'
			);
		});
	});

	describe('getBoards', () => {
		it('should retrieve all existing boards', async () => {
			await mockBoardRepository.createBoard('Board 1');
			await mockBoardRepository.createBoard('Board 2');
			const boards = await boardService.getBoards();

			expect(boards.length).toBe(2);
		});

		it('should return an empty array if no boards exist', async () => {
			const boards = await boardService.getBoards();

			expect(boards.length).toBe(0);
		});
	});
});
