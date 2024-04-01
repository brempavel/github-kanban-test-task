import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@chakra-ui/react';

import { Card } from './Card';
import { CardProps } from './interfaces';

export const SortableCard = ({ id, title, description, type }: CardProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: id ?? '',
		data: { type: 'Card', card: { id, title, description, type } },
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return isDragging ? (
		<Box
			w="100%"
			ref={setNodeRef}
			style={{ ...style, opacity: '0.5' }}
			mb="1rem"
		>
			<Card title={title} description={description}></Card>
		</Box>
	) : (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Card id={id} title={title} description={description} type={type} />
		</div>
	);
};
