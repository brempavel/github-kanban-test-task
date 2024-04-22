import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import {
	CollisionDetection,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
	closestCenter,
	closestCorners,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
	useCreateColumnMutation,
	useLazyGetBoardQuery,
	useChangeCardColumnMutation,
	useUpdateColumnMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { Column as IColumn } from '../../interfaces/Column';
import { ColumnsList } from '../../components/ColumnsList';
import { Column } from '../../components/Column';
import { Card as ICard } from '../../interfaces/Card';
import { Card } from '../../components/Card';
import { BoardTitle } from '../../components/BoardTitle';

export const Board = () => {
	const { id, columns } = useAppSelector(({ board }) => board);

	const [boardID, setBoardID] = useState<string>('');
	const [boardColumns, setBoardColumns] = useState<IColumn[]>([]);
	const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
	const [lastColumnOrder, setLastColumnOrder] = useState<number>(0);
	const [activeCard, setActiveCard] = useState<
		(ICard & { columnID: string }) | null
	>(null);
	const [initialColumnID, setInitialColumnID] = useState<string | null>(null);

	const [getBoard, getBoardResponse] = useLazyGetBoardQuery();
	const [createColumn, createColumnResponse] = useCreateColumnMutation();
	const [updateColumn] = useUpdateColumnMutation();
	const [changeCardColumn] = useChangeCardColumnMutation();
	const [updateCard] = useUpdateCardMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const boardColumnsIDs = useMemo(
		() => boardColumns.map(({ id }) => id),
		[boardColumns]
	);

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	useEffect(() => {
		if (id) {
			setBoardID(id);
			if (columns && columns.length > 0) {
				const sortedColumns = [...columns]
					.sort((a, b) => a.order - b.order)
					.map((column) => ({
						...column,
						cards: [...column.cards].sort((a, b) => a.order - b.order),
					}));

				setBoardColumns(sortedColumns);
				setLastColumnOrder(sortedColumns[sortedColumns.length - 1].order);
			} else {
				setBoardColumns([]);
				setLastColumnOrder(0);
			}
		} else {
			const boardID = localStorage.getItem('boardID');
			if (boardID) {
				setBoardID(boardID);
				getBoard({ id: boardID });
			} else {
				navigate('/');
			}
		}
	}, [getBoard, id, boardID, columns, navigate]);

	useEffect(() => {
		if (getBoardResponse.isSuccess) {
			const { id, title, columns } = getBoardResponse.data.board;
			setBoardID(id);
			if (columns && columns.length > 0) {
				const sortedColumns = [...columns]
					.sort((a, b) => a.order - b.order)
					.map((column) => ({
						...column,
						cards: [...column.cards].sort((a, b) => a.order - b.order),
					}));
				setBoardColumns(sortedColumns);
				setLastColumnOrder(sortedColumns[sortedColumns.length - 1].order);
				dispatch(setBoard({ id, title, columns: sortedColumns }));
			} else {
				dispatch(setBoard({ id, title, columns }));
			}
		}
	}, [getBoardResponse.data, getBoardResponse.isSuccess, dispatch]);

	useEffect(() => {
		if (createColumnResponse.isSuccess) {
			const newColumn = createColumnResponse.data.column;
			setBoardColumns((columns) => [...columns, newColumn]);
		}
	}, [createColumnResponse.data, createColumnResponse.isSuccess]);

	const onAddColumnClick = () => {
		createColumn({
			boardID,
			title: `Column ${lastColumnOrder}`,
			order: lastColumnOrder + 1000,
		});
		setLastColumnOrder((order) => order + 1000);
	};

	const collisionDetectionStrategy: CollisionDetection = useCallback(
		(args) => {
			// to prevent columns to be dragged over cards
			if (activeColumn) {
				return closestCorners({
					...args,
					droppableContainers: args.droppableContainers.filter(
						(container) => container.data.current?.type === 'Column'
					),
				});
			}
			return closestCenter({ ...args });
		},
		[activeColumn]
	);

	return (
		<>
			<BoardTitle />
			<Box height="80vh" p=".5rem">
				{boardColumns.length > 0 ? (
					<Flex>
						<DndContext
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDragEnd={onDragEnd}
							sensors={sensors}
							collisionDetection={collisionDetectionStrategy}
						>
							<SortableContext
								items={boardColumnsIDs}
								strategy={horizontalListSortingStrategy}
							>
								<ColumnsList columns={boardColumns} />
							</SortableContext>
							{createPortal(
								<DragOverlay>
									{activeColumn && (
										<Column title={activeColumn.title} id={activeColumn.id}>
											{boardColumns
												.find((column) => column.id === activeColumn.id)
												?.cards.map((card) => (
													<Card
														key={card.id}
														title={card.title}
														description={card.description}
														columnID={activeColumn.id}
													/>
												))}
											<Card columnID={activeColumn.id} />
										</Column>
									)}
									{activeCard && (
										<Card
											title={activeCard.title}
											description={activeCard.description}
											columnID={activeCard.columnID}
										/>
									)}
								</DragOverlay>,
								document.body
							)}
						</DndContext>
						<Button onClick={onAddColumnClick} minW="fit-content" mx=".5rem">
							+ Add new column
						</Button>
					</Flex>
				) : (
					<Button onClick={onAddColumnClick} mx=".5rem">
						+ Add New Column
					</Button>
				)}
			</Box>
		</>
	);

	function onDragStart({ active }: DragStartEvent) {
		setActiveColumn(null);
		setActiveCard(null);
		setInitialColumnID(null);

		if (active.data.current?.type === 'Column') {
			setActiveColumn(active.data.current.column);
			return;
		}

		if (active.data.current?.type === 'Card') {
			setActiveCard(active.data.current.card);
			setInitialColumnID(active.data.current.card.columnID);
			return;
		}
	}

	function onDragOver({ active, over }: DragOverEvent) {
		if (!over) return;

		// if we are moving card
		if (active.data.current?.type === 'Card') {
			const activeID = active.id;
			const overID = over.id;

			// if active element is the same as the over element
			if (activeID === overID) return;

			const isOverColumn = over.data.current?.type === 'Column';
			if (isOverColumn) {
				if (active.data.current?.card.columnID === overID) return;

				setBoardColumns((columns) => {
					const newColumns = columns.map((column) => {
						if (column.id === active.data.current?.card.columnID) {
							return {
								...column,
								cards: column.cards.filter(({ id }) => id !== activeID),
							};
						}

						if (column.id === overID) {
							const order =
								column.cards.length > 0
									? Math.max(...column.cards.map(({ order }) => order))
									: 1000;

							return {
								...column,
								cards: [
									...column.cards,
									{
										id: activeID.toString(),
										title: activeCard?.title,
										description: activeCard?.description,
										order,
									},
								],
							};
						}

						return column;
					});

					return arrayMove(newColumns, 0, 0);
				});
			}

			const isOverCard = over.data.current?.type === 'Card';
			if (isOverCard) {
				const activeColumnID = active.data.current?.card.columnID;
				const overColumnID = over.data.current?.card.columnID;
				// if card is in the same column
				if (activeColumnID === overColumnID) {
					// change card order
					setBoardColumns((columns) => {
						const columnIndex = columns.findIndex(
							({ id }) => id === overColumnID
						);

						const currentColumn = columns[columnIndex];

						const activeIndex = currentColumn.cards.findIndex(
							({ id }) => id === activeID
						);
						const overIndex = currentColumn.cards.findIndex(
							({ id }) => id === overID
						);

						const activeOrder = currentColumn.cards[activeIndex].order;
						const overOrder = currentColumn.cards[overIndex].order;

						let newOrder = 0;
						// moving card top to bottom
						if (activeOrder < overOrder) {
							const afterOverOrder = currentColumn.cards[overIndex + 1]?.order;
							// if we have card after over card
							if (afterOverOrder) {
								newOrder = overOrder + (afterOverOrder - overOrder) / 2;
							} else {
								// if there is no card after over card
								newOrder = overOrder + 1000;
							}
						}
						// moving card bottom to top
						if (activeOrder > overOrder) {
							const beforeOverOrder = currentColumn.cards[overIndex - 1]?.order;
							// if we have card before over card
							if (beforeOverOrder) {
								newOrder = beforeOverOrder + (overOrder - beforeOverOrder) / 2;
							} else {
								// if there is no card before over card
								newOrder = overOrder / 2;
							}
						}

						const newColumns = columns.map((column, index) => {
							if (index === columnIndex) {
								const cards = column.cards.map((card) => {
									if (card.id === activeID) {
										return { ...card, order: newOrder };
									}
									return card;
								});
								return {
									...column,
									cards: arrayMove(cards, activeIndex, overIndex),
								};
							}

							return column;
						});
						return arrayMove(newColumns, 0, 0);
					});
				}

				// if card changed column
				if (activeColumnID !== overColumnID) {
					// change card order and change card column
					setBoardColumns((columns) => {
						const activeColumnIndex = columns.findIndex(
							({ id }) => id === activeColumnID
						);
						const overColumnIndex = columns.findIndex(
							({ id }) => id === overColumnID
						);

						const overColumn = columns[overColumnIndex];

						const overIndex = overColumn.cards.findIndex(
							({ id }) => id === overID
						);

						const isBelowOverItem =
							over &&
							active.rect.current.translated &&
							active.rect.current.translated.top >
								over.rect.top + over.rect.height;

						const overOrder = overColumn.cards[overIndex].order;
						let activeOrder = 0;
						// if active item below over
						if (isBelowOverItem) {
							const afterOverOrder = overColumn.cards[overIndex + 1]?.order;
							// if there is an item after over item
							if (afterOverOrder) {
								activeOrder = overOrder + (afterOverOrder - overOrder) / 2;
							} else {
								// if there is no item after over item
								activeOrder = overOrder + 1000;
							}
						} else {
							const beforeOverOrder = overColumn.cards[overIndex - 1]?.order;
							// if there is an item before over item
							if (beforeOverOrder) {
								activeOrder =
									beforeOverOrder + (overOrder - beforeOverOrder) / 2;
							} else {
								// if there is no item before over item
								activeOrder = overOrder / 2;
							}
						}

						const newColumns = columns.map((column, index) => {
							if (index === activeColumnIndex) {
								return {
									...column,
									cards: column.cards.filter(({ id }) => id !== activeID),
								};
							}
							if (index === overColumnIndex) {
								const cards = [
									...column.cards.slice(0, overIndex),
									{
										id: activeID.toString(),
										title: active.data.current?.card.title,
										description: active.data.current?.card.description,
										order: activeOrder,
									},
									...column.cards.slice(overIndex),
								];
								return { ...column, cards };
							}
							return column;
						});

						return arrayMove(newColumns, 0, 0);
					});
				}
			}
		}
	}

	function onDragEnd({ active, over }: DragEndEvent) {
		// if there is no over element
		if (!over) return;

		// if we are moving card
		if (active.data.current?.type === 'Card') {
			const activeID = active.id;
			const activeColumnID = active.data.current?.card.columnID;

			const cards = boardColumns.flatMap(({ cards }) => cards);
			const card = cards.find(({ id }) => id === activeID);

			// if we are moving same card on the same position
			if (
				activeCard &&
				activeCard.order === active.data.current?.card.order &&
				initialColumnID === activeColumnID
			)
				return;

			if (card && activeColumnID !== initialColumnID) {
				// if card changed column
				changeCardColumn({
					id: card.id,
					boardID,
					columnID: initialColumnID,
					newColumnID: activeColumnID,
					order: card.order,
				});
			}

			// if card is in the same column
			if (card && activeColumnID === initialColumnID) {
				updateCard({
					id: card.id,
					boardID,
					columnID: activeColumnID,
					order: card.order,
				});
			}
		}

		// if we are moving column
		if (active.data.current?.type === 'Column') {
			const activeID = active.id;
			const overID = over.id;

			// if active element is the same as the over element
			if (activeID === overID) return;

			setBoardColumns((columns) => {
				const activeIndex = columns.findIndex(({ id }) => id === activeID);
				const overIndex = columns.findIndex(({ id }) => id === overID);

				const overOrder = columns[overIndex].order;
				let newOrder = 0;

				// if we are moving column from left to right
				if (activeIndex < overIndex) {
					const afterOverOrder = columns[overIndex + 1]?.order;
					// if we have column after over column
					if (afterOverOrder) {
						newOrder = overOrder + (afterOverOrder - overOrder) / 2;
					} else {
						// if there is no column after over column
						newOrder = overOrder + 1000;
					}
				}

				// if we are moving column from right to left
				if (activeIndex > overIndex) {
					const beforeOverOrder = columns[overIndex - 1]?.order;
					// if we have column before over column
					if (beforeOverOrder) {
						newOrder = beforeOverOrder + (overOrder - beforeOverOrder) / 2;
					} else {
						// if there is no column before over column
						newOrder = overOrder / 2;
					}
				}

				// updating order of active column in db
				updateColumn({ boardID, id: activeID, order: newOrder });

				// changing order of active column
				const newColumns = columns.map((column) =>
					column.id === activeID ? { ...column, order: newOrder } : column
				);

				return arrayMove(newColumns, activeIndex, overIndex);
			});
		}
	}
};
