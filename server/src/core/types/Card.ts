import { BoardID } from './Board';

export type CardParams = {
	boardID: BoardID;
} & (
	| {
			title: string;
			description?: string;
	  }
	| {
			title?: string;
			description: string;
	  }
	| {
			title: string;
			description: string;
	  }
);

export type CardID = string;
