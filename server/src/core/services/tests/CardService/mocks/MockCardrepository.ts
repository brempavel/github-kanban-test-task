import { Card } from '@entities';
import { CardRepository } from '@repositories';
import { BoardID, CardID, CardParams } from '@types';

export class MockCardRepository implements CardRepository {
	private cards: Card[] = [];

	async createCard({
		boardID,
		title,
		description,
		type,
	}: CardParams): Promise<Card> {
		const card: Card = {
			id: Math.floor(Math.random() * 100).toString(),
			title,
			description,
			type,
		};
		this.cards.push(card);

		return card;
	}

	async updateCard({
		id,
		boardID,
		title,
		description,
		type,
	}: CardParams & { id: CardID }): Promise<Card> {
		const cardIndex = this.cards.findIndex((card) => card.id === id);
		if (cardIndex === -1) {
			throw new Error('Card not found');
		}
		this.cards[cardIndex] = {
			...this.cards[cardIndex],
			title,
			description,
			type,
		};

		return this.cards[cardIndex];
	}

	async deleteCard({
		boardID,
		id,
	}: {
		boardID: BoardID;
		id: CardID;
	}): Promise<CardID> {
		const cardIndex = this.cards.findIndex((card) => card.id === id);
		if (cardIndex === -1) {
			throw new Error('Card not found');
		}
		this.cards.splice(cardIndex, 1);

		return id;
	}
}
