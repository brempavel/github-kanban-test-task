import { CardTypes } from '../../interfaces/Card';

export interface IBoardColumn {
	heading: string;
	children: React.ReactNode;
	type: CardTypes;
}
