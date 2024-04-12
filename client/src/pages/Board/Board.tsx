import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
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
	CollisionDetection,
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
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
	useDeleteBoardMutation,
	useLazyGetBoardQuery,
	useChangeCardColumnMutation,
	useUpdateBoardMutation,
	useUpdateColumnMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { Column as IColumn } from '../../interfaces/Column';
import { ColumnsList } from '../../components/ColumnsList';
import { Column } from '../../components/Column';
import { Card as ICard } from '../../interfaces/Card';
import { Card } from '../../components/Card';
import { CardsList } from '../../components/CardsList/CardsList';

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
	const [initialColumnID, setInitialColumnID] = useState<string | null>(null);

	const [getBoard, getBoardResponse] = useLazyGetBoardQuery();
	const [updateBoard] = useUpdateBoardMutation();
	const [deleteBoard] = useDeleteBoardMutation();
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
			return closestCorners({ ...args });
		},
		[activeColumn]
	);

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
											columnID=""
										/>
									)}
								</DragOverlay>,
								document.body
							)}
						</DndContext>
						<Button onClick={onAddColumnClick} borderRadius="0">
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

	function onDragStart({ active }: DragStartEvent) {
		if (active.data.current?.type === 'Column') {
			setActiveColumn(active.data.current.column);
			return;
		}
		if (active.data.current?.type === 'Card') {
			setActiveCard(active.data.current.card);
			return;
		}
	}

	function onDragOver({ active, over }: DragOverEvent) {
		if (!over) return;
	}

	function onDragEnd({ active, over }: DragEndEvent) {
		setActiveCard(null);
		setActiveColumn(null);

		// if there is no over element
		if (!over) return;

		// if we are moving column
		if (active.data.current?.type === 'Column') {
			const activeID = active.id;
			const overID = over.id;

			// if active element is the same as the over element
			if (activeID === overID) return;

			setBoardColumns((columns) => {
				const activeIndex = columns.findIndex(
					({ id }) => id === activeID.toString()
				);
				const overIndex = columns.findIndex(
					({ id }) => id === overID.toString()
				);

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
