import { Column } from '@entities';
import { BoardID } from '@types';

export class Board {
	constructor(
		readonly id: BoardID,
		readonly title: string,
		readonly columns: Column[]
	) {}
}
