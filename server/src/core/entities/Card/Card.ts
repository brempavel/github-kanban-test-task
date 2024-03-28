import { CardID, CardTypes } from '@types';

export class Card {
	constructor(
		readonly id: CardID,
		readonly title: string,
		readonly description: string,
		readonly type: CardTypes,
		readonly order: number
	) {}
}
