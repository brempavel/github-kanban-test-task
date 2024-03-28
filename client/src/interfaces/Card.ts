export interface Card {
	id: string;
	title?: string;
	description?: string;
	type: CardTypes;
	order: number;
}

export type CardTypes = 'todo' | 'inProgress' | 'done';
