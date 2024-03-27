import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
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
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	DragStartEvent,
	DragOverEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useAppSelector } from '../../hooks/useAppSelector';
import {
	useDeleteBoardMutation,
	useLazyGetBoardQuery,
	useUpdateBoardMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { DroppableBoardColumn } from '../../components/BoardColumn';
import { Card } from '../../components/Card';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setBoard, setCards } from '../../store/slices/boardSlice';
import { CardTypes, Card as ICard } from '../../interfaces/Card';
import { CardsList } from '../../components/CardsList/CardsList';

export const Board = () => {
	const boardID = localStorage.getItem('boardID');
	const [boardName, setBoardName] = useState<string>('');
	const [newBoardName, setNewBoardName] = useState<string>('');
	const [boardCards, setBoardCards] = useState<ICard[]>([]);
	const [todoCards, setTodoCards] = useState<ICard[]>([]);
	const [inProgressCards, setInProgressCards] = useState<ICard[]>([]);
	const [doneCards, setDoneCards] = useState<ICard[]>([]);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [getBoard, getBoardResponse] = useLazyGetBoardQuery();
	const [updateBoard] = useUpdateBoardMutation();
	const [deleteBoard] = useDeleteBoardMutation();
	const [updateCard] = useUpdateCardMutation();
	const { name, cards } = useAppSelector(({ board }) => board);

	const [activeCard, setActiveCard] = useState<ICard | null>(null);
	const [clonedCards, setClonedCards] = useState<ICard[] | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (name) {
			setBoardName(name);
			setBoardCards(cards);
		} else {
			getBoard({ id: boardID });
		}
	}, [getBoard, name, boardID, cards]);

	useEffect(() => {
		if (getBoardResponse.isSuccess) {
			const { id, name, cards } = getBoardResponse.data.board;
			dispatch(setBoard({ id, name, cards }));
			setBoardName(name);
			setBoardCards(cards);
		}
	}, [getBoardResponse.data, getBoardResponse.isSuccess, dispatch]);

	useEffect(() => {
		setTodoCards(boardCards.filter(({ type }) => type === 'todo'));
		setInProgressCards(boardCards.filter(({ type }) => type === 'inProgress'));
		setDoneCards(boardCards.filter(({ type }) => type === 'done'));
	}, [boardCards]);

	const onEditClick = () => {
		setIsEditable(!isEditable);
		setNewBoardName(boardName);
	};

	const onDeleteClick = () => {
		deleteBoard({ id: boardID });
		navigate('/');
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (boardName === newBoardName || isError || boardName === '') {
			setIsError(true);
			return;
		}

		updateBoard({ id: boardID, name: newBoardName });
		setBoardName(newBoardName);
		setIsEditable(!isEditable);
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewBoardName(event.target.value);
		if (event.target.value === '') {
			setIsError(true);
		}
	};

	const onDragStart = (event: DragStartEvent) => {
		if (event.active.data.current?.type === 'Card') {
			setActiveCard(event.active.data.current.card);
			setClonedCards(boardCards);
		}
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeID = active.id;
		const overID = over.id;

		if (activeID === overID) return;

		const isActiveACard = active.data.current?.type === 'Card';
		const isOverACard = over.data.current?.type === 'Card';

		if (isActiveACard && isOverACard) {
			setBoardCards((cards) => {
				const activeIndex = cards.findIndex((card) => card.id === activeID);
				const overIndex = cards.findIndex((card) => card.id === overID);

				if (boardCards[activeIndex].type !== boardCards[overIndex].type) {
					updateCard({
						boardID,
						id: activeID,
						type: boardCards[overIndex].type,
					});
				}

				const newCards = cards.map((card, index) => {
					if (index === activeIndex) {
						return { ...card, type: boardCards[overIndex].type };
					} else {
						return card;
					}
				});

				return arrayMove(newCards, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === 'Column';
		if (isActiveACard && isOverAColumn) {
			const activeIndex = cards.findIndex((card) => card.id === activeID);

			if (boardCards[activeIndex].type === overID) return;

			setBoardCards((cards) => {
				updateCard({
					boardID,
					id: activeID,
					type: overID,
				});

				const newCards = cards.map((card, index) => {
					if (index === activeIndex) {
						return { ...card, type: overID as CardTypes };
					} else {
						return card;
					}
				});

				return arrayMove(newCards, activeIndex, activeIndex);
			});
		}
	};

	const onDragCancel = () => {
		if (clonedCards) {
			setBoardCards(clonedCards);
		}

		setActiveCard(null);
		setClonedCards(null);
	};

	const onDragEnd = () => {
		dispatch(setCards({ cards: boardCards }));
	};

	return (
		<>
			<Flex alignItems="center" justifyContent="center" gap=".5rem">
				<Box pos="relative" w="fit-content">
					{!isEditable ? (
						<>
							<Heading>{boardName}</Heading>
							<ButtonGroup pos="absolute" top=".15rem" gap="0rem" right="-8rem">
								<IconButton
									onClick={onEditClick}
									borderRadius="0"
									bgColor="white"
									aria-label="Edit Board"
									icon={<EditIcon w="1.5rem" h="1.5rem" />}
								>
									Edit
								</IconButton>
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
									value={newBoardName}
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
									>
										Save
									</IconButton>
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
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDragCancel={onDragCancel}
				onDragEnd={onDragEnd}
			>
				<Center>
					<Flex gap="1rem">
						<SortableContext
							items={todoCards}
							strategy={verticalListSortingStrategy}
						>
							<DroppableBoardColumn heading="To Do" type="todo">
								<CardsList cards={todoCards} />
								<Card />
							</DroppableBoardColumn>
						</SortableContext>
						<SortableContext
							items={inProgressCards}
							strategy={verticalListSortingStrategy}
						>
							<DroppableBoardColumn heading="In Progress" type="inProgress">
								<CardsList cards={inProgressCards} />
							</DroppableBoardColumn>
						</SortableContext>
						<SortableContext
							items={doneCards}
							strategy={verticalListSortingStrategy}
						>
							<DroppableBoardColumn heading="Done" type="done">
								<CardsList cards={doneCards} />
							</DroppableBoardColumn>
						</SortableContext>
					</Flex>
				</Center>
				<DragOverlay>
					{activeCard && (
						<Card
							title={activeCard.title}
							description={activeCard.description}
						/>
					)}
				</DragOverlay>
			</DndContext>
		</>
	);
};
