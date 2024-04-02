import { BoardID } from './Board';

export type ColumnID = string;

export type ColumnParams = {
	boardID: BoardID;
	title: string;
	order: number;
};
