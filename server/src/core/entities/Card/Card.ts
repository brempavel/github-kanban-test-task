import { CardTypes } from '@types';

export class Card {
	constructor(
		readonly id: string,
		readonly title: string,
		readonly description: string,
		readonly type: CardTypes
	) {}
}
