import { useDroppable } from '@dnd-kit/core';
import { BoardColumn, IBoardColumn } from '.';

export const DroppableBoardColumn = ({
	heading,
	children,
	type,
}: IBoardColumn) => {
	const { setNodeRef } = useDroppable({
		id: type,
		data: { type: 'Column' },
	});

	return (
		<div ref={setNodeRef}>
			<BoardColumn heading={heading} type={type}>
				{children}
			</BoardColumn>
		</div>
	);
};