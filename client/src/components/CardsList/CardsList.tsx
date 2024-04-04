import { Card } from '../../interfaces/Card';
import { SortableCard } from '../Card';

interface CardsListProps {
	cards: Card[];
	columnID: string;
}

export const CardsList = ({ cards, columnID }: CardsListProps) => {
	const parsedCards = cards.map(({ id, title, description }) => (
		<SortableCard
			key={id}
			title={title}
			description={description}
			id={id}
			columnID={columnID}
		/>
	));
	return parsedCards;
};
