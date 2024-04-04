import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Column } from './Column';
import { IBoardColumn } from './interfaces';

export const SortableColumn = ({
	title,
	children,
	id,
	order,
}: IBoardColumn & { order: number }) => {
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
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return isDragging ? (
		<div ref={setNodeRef} style={{ ...style, opacity: '0.5' }}>
			<Column title={title} id={id}>
				{children}
			</Column>
		</div>
	) : (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Column title={title} id={id}>
				{children}
			</Column>
		</div>
	);
};
