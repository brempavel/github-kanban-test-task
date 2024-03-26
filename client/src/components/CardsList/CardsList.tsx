import { Card as ICard } from '../../interfaces/Card';
import { SortableCard } from '../Card';

interface CardsListProps {
	cards: ICard[];
}

export const CardsList = ({ cards }: CardsListProps) => {
	const parsedCards = cards.map(({ id, title, description, type }) => (
		<SortableCard
			key={id}
			title={title}
			description={description}
			id={id}
			type={type}
		/>
	));
	return parsedCards;
};
