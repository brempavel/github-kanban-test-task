import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Flex } from '@chakra-ui/react';

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
					items={cards.sort((a, b) => a.order - b.order).map(({ id }) => id)}
					strategy={verticalListSortingStrategy}
				>
					<CardsList cards={cards} columnID={id} />
				</SortableContext>
				<Card columnID={id} />
			</SortableColumn>
		);
	});

	return <Flex h="100%">{parsedColumns}</Flex>;
};
