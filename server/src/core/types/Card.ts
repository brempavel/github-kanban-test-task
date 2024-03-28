import { BoardID } from './Board';

export type CardParams = {
	boardID: BoardID;
	order: number;
	type: CardTypes;
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

export type CardID = string;

export type CardTypes = 'todo' | 'inProgress' | 'done';
