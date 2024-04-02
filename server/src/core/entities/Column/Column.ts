import { Card } from '@entities';
import { ColumnID } from '@types';

export class Column {
	constructor(
		readonly id: ColumnID,
		readonly title: string,
		readonly order: number,
		readonly cards: Card[]
	) {}
}
