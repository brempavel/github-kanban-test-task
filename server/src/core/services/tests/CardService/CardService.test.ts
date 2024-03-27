import { CardService } from '../..';
import { CardParams, CardID, BoardID } from '@types';
import { MockCardRepository } from './mocks/MockCardrepository';

describe('CardService', () => {
	let cardService: CardService;

	beforeEach(() => {
		const mockCardRepository = new MockCardRepository();
		cardService = new CardService(mockCardRepository);
	});

	describe('createCard', () => {
		it('should create a new card', async () => {
			const cardParams: CardParams = {
				boardID: 'board1',
				title: 'Test Card',
				description: 'Description',
				type: 'todo',
			};

			const createdCard = await cardService.createCard(cardParams);

			expect(createdCard.title).toBe('Test Card');
			expect(createdCard.description).toBe('Description');
			expect(createdCard.type).toBe('todo');
			expect(createdCard.id).toBeTruthy();
		});
	});

	describe('updateCard', () => {
		it('should update an existing card', async () => {
			const cardParams: CardParams = {
				boardID: 'board1',
				title: 'Updated Card',
				description: 'Updated Description',
				type: 'inProgress',
			};

			const createdCard = await cardService.createCard(cardParams);
			const updatedCard = await cardService.updateCard({
				...cardParams,
				id: createdCard.id as CardID,
			});

			expect(updatedCard.title).toBe('Updated Card');
			expect(updatedCard.description).toBe('Updated Description');
			expect(updatedCard.type).toBe('inProgress');
		});

		it('should throw error if card not found', async () => {
			const cardParams: CardParams = {
				boardID: 'board1',
				title: 'Updated Card',
				description: 'Updated Description',
				type: 'inProgress',
			};

			await expect(
				cardService.updateCard({ ...cardParams, id: 'nonExistingId' })
			).rejects.toThrow('Card not found');
		});
	});

	describe('deleteCard', () => {
		it('should delete an existing card', async () => {
			const boardID: BoardID = 'board1';
			const cardParams: CardParams = {
				boardID,
				title: 'Test Card',
				description: 'Description',
				type: 'todo',
			};

			const createdCard = await cardService.createCard(cardParams);
			const deletedCardId = await cardService.deleteCard({
				boardID,
				id: createdCard.id as CardID,
			});

			expect(deletedCardId).toBe(createdCard.id);
		});

		it('should throw error if card not found', async () => {
			await expect(
				cardService.deleteCard({ boardID: 'board1', id: 'nonExistingId' })
			).rejects.toThrow('Card not found');
		});
	});
});
