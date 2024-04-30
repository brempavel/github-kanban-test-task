import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@chakra-ui/react';

import { Card } from './Card';
import { CardProps } from './interfaces';
import { useAppSelector } from '../../hooks/useAppSelector';

export const SortableCard = ({
	id,
	title,
	description,
	columnID,
	order,
}: CardProps) => {
	const { editable } = useAppSelector(({ board }) => board);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: id ?? '',
		data: { type: 'Card', card: { id, title, description, columnID, order } },
		disabled: editable,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return isDragging ? (
		<Box w="100%" ref={setNodeRef} style={{ ...style, opacity: '0.5' }}>
			<Card title={title} description={description} columnID={columnID}></Card>
		</Box>
	) : (
		<Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Card
				id={id}
				title={title}
				description={description}
				columnID={columnID}
			/>
		</Box>
	);
};
