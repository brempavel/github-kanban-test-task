import { Column } from './Column';

export interface Board {
	id: string;
	title: string;
	columns: Column[];
}
