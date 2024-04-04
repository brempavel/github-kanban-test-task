import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	IconButton,
	Input,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
	useCreateColumnMutation,
	useDeleteBoardMutation,
	useLazyGetBoardQuery,
	useChangeCardColumnMutation,
	useUpdateBoardMutation,
	useUpdateColumnMutation,
} from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { Column as IColumn } from '../../interfaces/Column';
import { ColumnsList } from '../../components/ColumnsList';
import { Column } from '../../components/Column';
import { Card as ICard } from '../../interfaces/Card';
import { Card } from '../../components/Card';

export const Board = () => {
	const { id, title, columns } = useAppSelector(({ board }) => board);

	const [boardID, setBoardID] = useState<string>('');
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [newBoardTitle, setNewBoardTitle] = useState<string>('');
	const [boardColumns, setBoardColumns] = useState<IColumn[]>([]);
	const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
	const [lastColumnOrder, setLastColumnOrder] = useState<number>(0);
	const [activeCard, setActiveCard] = useState<ICard | null>(null);
	const [isBoardEditable, setIsBoardEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [previousColumnID, setPreviousColumnID] = useState<string | null>(null);

	const [getBoard, getBoardResponse] = useLazyGetBoardQuery();
	const [updateBoard] = useUpdateBoardMutation();
	const [deleteBoard] = useDeleteBoardMutation();
	const [createColumn, createColumnResponse] = useCreateColumnMutation();
	const [updateColumn] = useUpdateColumnMutation();
	const [changeCardColumn] = useChangeCardColumnMutation();

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
			setBoardTitle(title);
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
	}, [getBoard, id, boardID, title, columns, navigate]);

	useEffect(() => {
		if (getBoardResponse.isSuccess) {
			const { id, title, columns } = getBoardResponse.data.board;
			setBoardID(id);
			setBoardTitle(title);
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

	const onEditClick = () => {
		setIsError(false);
		setIsBoardEditable(!isBoardEditable);
		setNewBoardTitle(boardTitle);
	};

	const onDeleteClick = () => {
		deleteBoard({ id: boardID });
		navigate('/');
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewBoardTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (boardTitle === newBoardTitle) return;

		if (isError || !boardTitle) {
			setIsError(true);
			return;
		}

		updateBoard({ id: boardID, title: newBoardTitle });
		setBoardTitle(newBoardTitle);
		setIsBoardEditable(!isBoardEditable);
	};

	const onAddColumnClick = () => {
		createColumn({
			boardID,
			title: `Column ${lastColumnOrder}`,
			order: lastColumnOrder + 1000,
		});
		setLastColumnOrder((order) => order + 1000);
	};

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.column);
			return;
		}
		if (event.active.data.current?.type === 'Card') {
			setActiveCard(event.active.data.current.card);
			return;
		}
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		if (!over) return;

		if (active.data.current?.type === 'Card') {
			const activeCardID = active.id;
			const overID = over.id;

			if (activeCardID === overID) return;

			const isOverColumn = over.data.current?.type === 'Column';

			if (isOverColumn) {
				if (active.data.current?.card.columnID === overID) return;

				// id is assigned after each move to column. if we move card after 1 column it thinks that card is situated in previous column and not in first, so the column id is wrong
				setPreviousColumnID(active.data.current?.card.columnID);

				setBoardColumns((columns) => {
					const activeColumnIndex = columns.findIndex(
						(column) => column.id === active.data.current?.card.columnID
					);
					const overColumnIndex = columns.findIndex(
						(column) => column.id === overID
					);

					const newCardOrder =
						columns[overColumnIndex].cards.length > 0
							? Math.max(
									...columns[overColumnIndex].cards.map((card) => card.order)
							  ) + 1000
							: 1000;

					const newColumns = columns.map((column, index) => {
						if (index === activeColumnIndex) {
							return {
								...column,
								cards: column.cards.filter((card) => card.id !== activeCardID),
							};
						}
						if (index === overColumnIndex) {
							return {
								...column,
								cards: [
									...column.cards,
									{
										id: activeCardID,
										title: active.data.current?.card.title,
										description: active.data.current?.card.description,
										order: newCardOrder,
									} as ICard,
								],
							};
						}
						return column;
					});

					return arrayMove(newColumns, 0, 0);
				});
			}

			// const isOverCard = over.data.current?.type === 'Card';

			// if (isOverCard) {
			// 	setBoardColumns((columns) => {
			// 		return arrayMove(newColumns, 0, 0);
			// 	});
			// }
		}

		if (!over) return;
	};

	const onDragEnd = (event: DragEndEvent) => {
		setActiveCard(null);
		setActiveColumn(null);

		const { active, over } = event;

		if (!over) return;

		if (active.data.current?.type === 'Card') {
			const activeCardID = active.id;
			const overID = over.id;

			if (activeCardID === overID) return;

			const isOverColumn = over.data.current?.type === 'Column';
			if (isOverColumn) {
				if (!previousColumnID) return;

				const overColumnIndex = boardColumns.findIndex(
					(column) => column.id === overID
				);

				const newCardOrder =
					boardColumns[overColumnIndex].cards.length > 0
						? Math.max(
								...boardColumns[overColumnIndex].cards.map((card) => card.order)
						  ) + 1000
						: 1000;

				changeCardColumn({
					id: activeCardID,
					boardID,
					columnID: previousColumnID,
					newColumnID: overID,
					order: newCardOrder,
				});
			}

			// const isOverCard = over.data.current?.type === 'Card';

			// if (isOverCard) {
			// 	const activeCard = active.data.current?.card;
			// 	const overCard = over.data.current?.card;

			// 	console.log(activeCard, overCard);

			// 	// setBoardColumns((columns) => {
			// 	// 	return arrayMove(newColumns, 0, 0);
			// 	// });
			// }

			setPreviousColumnID(null);
		}

		// if we are moving column over column
		if (
			active.data.current?.type === 'Column' &&
			over.data.current?.type === 'Column'
		) {
			const activeColumnID = active.id;
			const overColumnID = over.id;

			if (activeColumnID === overColumnID) return;

			setBoardColumns((columns) => {
				const activeColumnIndex = columns.findIndex(
					(column) => column.id === activeColumnID
				);
				const overColumnIndex = columns.findIndex(
					(column) => column.id === overColumnID
				);

				const overColumnOrder = columns[overColumnIndex].order;
				const activeColumnOrder = columns[activeColumnIndex].order;
				let newOrder = 0;

				// if we are moving column from left to right
				if (activeColumnOrder < overColumnOrder) {
					const afterOverColumnOrder = columns[overColumnIndex + 1]?.order;
					// if we have column after over column
					if (afterOverColumnOrder) {
						newOrder =
							overColumnOrder + (afterOverColumnOrder - overColumnOrder) / 2;
						updateColumn({
							boardID,
							id: activeColumnID,
							order: newOrder,
						});
					} else {
						// if there is no column after over column
						newOrder = overColumnOrder + 1000;
						updateColumn({
							boardID,
							id: activeColumnID,
							order: newOrder,
						});
					}
				}

				// if we are moving column from right to left
				if (activeColumnOrder > overColumnOrder) {
					const beforeOverColumnOrder = columns[overColumnIndex - 1]?.order;
					// if we have column before over column
					if (beforeOverColumnOrder) {
						newOrder =
							beforeOverColumnOrder +
							(overColumnOrder - beforeOverColumnOrder) / 2;
						updateColumn({
							boardID,
							id: activeColumnID,
							order: newOrder,
						});
					} else {
						// if there is no column before over column
						newOrder = overColumnOrder / 2;
						updateColumn({
							boardID,
							id: activeColumnID,
							order: newOrder,
						});
					}
				}

				const newColumns = columns.map((column, index) => {
					if (index === activeColumnIndex) {
						return { ...column, order: newOrder };
					}

					return column;
				});

				return arrayMove(newColumns, activeColumnIndex, overColumnIndex);
			});
		}
	};

	return (
		<>
			<Flex
				justify="center"
				gap=".5rem"
				pos="fixed"
				left="50%"
				transform="translate(-50%, 0)"
			>
				<Box pos="relative" w="fit-content">
					{!isBoardEditable ? (
						<>
							<Heading>{boardTitle}</Heading>
							<ButtonGroup pos="absolute" top=".15rem" gap="0rem" right="-8rem">
								<IconButton
									onClick={onEditClick}
									borderRadius="0"
									bgColor="white"
									aria-label="Edit Board"
									icon={<EditIcon w="1.5rem" h="1.5rem" />}
								/>
								<IconButton
									m="0"
									onClick={onDeleteClick}
									borderRadius="0"
									bgColor="white"
									aria-label="Delete board"
									icon={<DeleteIcon w="1.5rem" h="1.5rem" />}
								/>
							</ButtonGroup>
						</>
					) : (
						<form onSubmit={onSubmit}>
							<FormControl isInvalid={isError}>
								<Input
									onChange={onChange}
									value={newBoardTitle}
									w="30vw"
									mr=".5rem"
								/>
								{isError && (
									<FormErrorMessage pos="absolute">
										Name is required.
									</FormErrorMessage>
								)}
								<ButtonGroup spacing=".5rem" pos="absolute">
									<IconButton
										type="submit"
										borderRadius="0"
										bgColor="white"
										aria-label="Save board name"
										icon={<CheckIcon w="1.5rem" h="1.5rem" />}
									/>
									<IconButton
										onClick={onEditClick}
										borderRadius="0"
										bgColor="white"
										aria-label="Cancel edit board name"
										icon={<CloseIcon w="1.5rem" h="1.5rem" />}
									/>
								</ButtonGroup>
							</FormControl>
						</form>
					)}
				</Box>
			</Flex>
			{/* Spacer */}
			<Box h="5rem" />
			<Box>
				{boardColumns.length > 0 ? (
					<Flex>
						<DndContext
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDragEnd={onDragEnd}
							sensors={sensors}
							collisionDetection={closestCenter}
						>
							<SortableContext items={boardColumnsIDs}>
								<ColumnsList columns={boardColumns} />
							</SortableContext>
							{createPortal(
								<DragOverlay>
									{activeColumn && (
										<Column title={activeColumn.title} id={activeColumn.id}>
											<Card columnID={activeColumn.id} />
										</Column>
									)}
									{activeCard && (
										<Card
											title={activeCard.title}
											description={activeCard.description}
											columnID=""
										/>
									)}
								</DragOverlay>,
								document.body
							)}
						</DndContext>
						<Button
							onClick={onAddColumnClick}
							borderRadius="0"
							minW="10rem"
							alignSelf="center"
						>
							+ Add New Column
						</Button>
					</Flex>
				) : (
					<Center mt="3rem">
						<Button onClick={onAddColumnClick} borderRadius="0">
							+ Add New Column
						</Button>
					</Center>
				)}
			</Box>
		</>
	);
};
