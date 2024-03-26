export interface Card {
	id: string;
	title?: string;
	description?: string;
	type: CardTypes;
}

export type CardTypes = 'todo' | 'inProgress' | 'done';
