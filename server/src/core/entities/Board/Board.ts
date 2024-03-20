import { Card } from '..';

export class Board {
	constructor(
		readonly id: string,
		readonly name: string,
		readonly cards: Card[]
	) {}
}
