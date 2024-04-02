import { CardID } from '@types';

export class Card {
	constructor(
		readonly id: CardID,
		readonly title: string,
		readonly description: string,
		readonly order: number
	) {}
}
