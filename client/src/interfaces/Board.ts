import { Card } from './Card';

export interface Board {
	id: string;
	name: string;
	cards: Card[];
}
