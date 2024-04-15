import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Column } from '../../interfaces/Column';
import { Card } from '../Card';
import { CardsList } from '../CardsList/CardsList';
import { SortableColumn } from '../Column';

interface ColumnsListProps {
	columns: Column[];
}

export const ColumnsList = ({ columns }: ColumnsListProps) => {
	const parsedColumns = columns.map(({ id, title, cards, order }) => {
		return (
			<SortableColumn key={id} title={title} id={id} order={order}>
				<SortableContext
					items={cards.map(({ id }) => id)}
					strategy={verticalListSortingStrategy}
				>
					<CardsList cards={cards} columnID={id} />
				</SortableContext>
				<Card columnID={id} />
			</SortableColumn>
		);
	});

	return parsedColumns;
};
