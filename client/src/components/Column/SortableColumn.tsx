import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@chakra-ui/react';

import { Column } from './Column';
import { BoardColumnProps } from './interfaces';
import { useAppSelector } from '../../hooks/useAppSelector';

export const SortableColumn = ({
	title,
	children,
	id,
	order,
}: BoardColumnProps & { order: number }) => {
	const { editable } = useAppSelector(({ board }) => board);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		data: {
			type: 'Column',
			column: { id, title, order, children },
		},
		disabled: editable,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return isDragging ? (
		<Box ref={setNodeRef} style={{ ...style, opacity: '0.5' }}>
			<Column title={title} id={id}>
				{children}
			</Column>
		</Box>
	) : (
		<Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Column title={title} id={id}>
				{children}
			</Column>
		</Box>
	);
};
