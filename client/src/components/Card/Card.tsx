import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Card as ChakraCard,
	Heading,
	CardBody,
	Text,
	Center,
	Flex,
	CardHeader,
	Input,
	Textarea,
	ButtonGroup,
	IconButton,
	FormControl,
	FormErrorMessage,
} from '@chakra-ui/react';
import {
	AddIcon,
	CheckIcon,
	CloseIcon,
	DeleteIcon,
	EditIcon,
} from '@chakra-ui/icons';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
	useCreateCardMutation,
	useDeleteCardMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { CardProps } from './interfaces';

export const Card = ({ id, title, description, columnID }: CardProps) => {
	const { id: boardID, columns } = useAppSelector(({ board }) => board);

	const [cardColumnID, setCardColumnID] = useState<string>('');
	const [cardID, setCardID] = useState<string>('');
	const [cardTitle, setCardTitle] = useState<string>('');
	const [cardDescription, setCardDescription] = useState<string>('');
	const [newCardTitle, setNewCardTitle] = useState<string>('');
	const [newCardDescription, setNewCardDescription] = useState<string>('');
	const [lastCardOrder, setLastCardOrder] = useState<number>(0);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const [createCard, createCardResponse] = useCreateCardMutation();
	const [deleteCard] = useDeleteCardMutation();
	const [updateCard] = useUpdateCardMutation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (title) setCardTitle(title.toString());
		if (description) setCardDescription(description.toString());
		if (id) setCardID(id);
		setCardColumnID(columnID);

		const column = columns && columns.find(({ id }) => id === columnID);
		if (column && column.cards.length > 0) {
			const lastCardOrder = Math.max(...column.cards.map(({ order }) => order));
			setLastCardOrder(lastCardOrder);
		}
	}, [title, description, id, columns, cardID, columnID]);

	useEffect(() => {
		if (createCardResponse.isSuccess) {
			const card = createCardResponse.data.card;
			setCardID(card.id);
		}
	}, [dispatch, createCardResponse]);

	const onEditClick = () => {
		setIsEditable(!isEditable);
		setNewCardTitle(cardTitle);
		setNewCardDescription(cardDescription);
		setIsError(false);
	};

	const onDeleteClick = () => {
		deleteCard({ boardID, columnID: cardColumnID, id: cardID });
	};

	const onSaveClick = () => {
		if (isError || (!newCardTitle && !newCardDescription)) {
			setIsError(true);
			return;
		}

		if (cardTitle !== newCardTitle || cardDescription !== newCardDescription) {
			updateCard({
				id: cardID,
				boardID,
				columnID: cardColumnID,
				title: newCardTitle,
				description: newCardDescription,
			});
			setCardTitle(newCardTitle);
			setCardDescription(newCardDescription);
			setIsEditable(!isEditable);
		}
	};

	const onCardTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewCardTitle(event.target.value);
		if (!event.target.value && !newCardDescription) {
			setIsError(true);
		}
	};

	const onCardDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setIsError(false);
		setNewCardDescription(event.target.value);
		if (!event.target.value && !newCardTitle) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError || (!newCardTitle && !newCardDescription)) {
			setIsError(true);
			return;
		}

		setIsEditable(!isEditable);
		createCard({
			boardID,
			columnID: cardColumnID,
			title: newCardTitle,
			description: newCardDescription,
			order: lastCardOrder + 1000,
		});
		setLastCardOrder((order) => order + 1000);
	};

	return (
		<>
			{title || description ? (
				<ChakraCard
					boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
					w="100%"
					p=".5rem"
					mb="1rem"
				>
					<CardHeader p="1rem">
						<FormControl isInvalid={isError}>
							{!isEditable ? (
								<Center>
									<Heading size="md">{cardTitle}</Heading>
								</Center>
							) : (
								<Input
									onChange={onCardTitleChange}
									value={newCardTitle}
									placeholder="Title"
								/>
							)}
						</FormControl>
					</CardHeader>
					<CardBody p="1rem">
						<FormControl isInvalid={isError}>
							{!isEditable ? (
								<Center>
									<Text>{cardDescription}</Text>
								</Center>
							) : (
								<Textarea
									onChange={onCardDescriptionChange}
									value={newCardDescription}
									placeholder="Description..."
								/>
							)}
							{isError && (
								<FormErrorMessage>
									Title or Description must be provided
								</FormErrorMessage>
							)}
						</FormControl>
					</CardBody>
					<Flex justifyContent="end">
						<ButtonGroup spacing=".1rem">
							{isEditable ? (
								<>
									<IconButton
										onClick={onSaveClick}
										size="sm"
										bgColor="white"
										aria-label="Save card"
										icon={<CheckIcon w="1rem" h="1rem" />}
									/>
									<IconButton
										onClick={onEditClick}
										size="sm"
										bgColor="white"
										aria-label="Cancel edit card"
										icon={<CloseIcon w="1rem" h="1rem" />}
									/>
								</>
							) : (
								<>
									<IconButton
										onClick={onEditClick}
										size="sm"
										bgColor="white"
										aria-label="Edit card"
										icon={<EditIcon w="1rem" h="1rem" />}
									/>
									<IconButton
										onClick={onDeleteClick}
										size="sm"
										bgColor="white"
										aria-label="Delete card"
										icon={<DeleteIcon w="1rem" h="1rem" />}
									/>
								</>
							)}
						</ButtonGroup>
					</Flex>
				</ChakraCard>
			) : (
				<ChakraCard boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)">
					{!isEditable ? (
						<IconButton
							onClick={onEditClick}
							aria-label="Add card"
							icon={<AddIcon />}
							display="block"
							m="0"
							w="100%"
						/>
					) : (
						<form onSubmit={onSubmit}>
							<FormControl isInvalid={isError}>
								<CardHeader p="1rem">
									<Input
										onChange={onCardTitleChange}
										value={newCardTitle}
										placeholder="Title"
									/>
								</CardHeader>
								<CardBody p="1rem">
									<Textarea
										onChange={onCardDescriptionChange}
										value={newCardDescription}
										placeholder="Description..."
									/>
									{isError && (
										<FormErrorMessage>
											Title or Description must be provided
										</FormErrorMessage>
									)}
								</CardBody>
								<Flex justifyContent="end">
									<ButtonGroup m="0 1rem 1rem 0">
										<IconButton
											type="submit"
											size="sm"
											bgColor="white"
											aria-label="Save card"
											icon={<CheckIcon w="1rem" h="1rem" />}
										/>
										<IconButton
											onClick={onEditClick}
											size="sm"
											bgColor="white"
											aria-label="Cancel edit card"
											icon={<CloseIcon w="1rem" h="1rem" />}
										/>
									</ButtonGroup>
								</Flex>
							</FormControl>
						</form>
					)}
				</ChakraCard>
			)}
		</>
	);
};
