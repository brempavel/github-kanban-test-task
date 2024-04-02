import { BoardID } from './Board';
import { ColumnID } from './Column';

export type CardID = string;

export type CardParams = {
	boardID: BoardID;
	columnID: ColumnID;
	order: number;
} & (
	| {
			title: string;
			description?: string;
	  }
	| {
			title?: string;
			description: string;
	  }
);
