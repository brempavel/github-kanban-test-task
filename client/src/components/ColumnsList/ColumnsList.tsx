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
				<CardsList cards={cards} columnID={id} />
				<Card columnID={id} />
			</SortableColumn>
		);
	});

	return parsedColumns;
};
