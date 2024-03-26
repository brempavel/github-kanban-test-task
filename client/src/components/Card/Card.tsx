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
import { addCard, removeCard } from '../../store/slices/boardSlice';
import { CardProps } from '.';

export const Card = ({ id, title, description, type }: CardProps) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [cardID, setCardID] = useState<string>('');
	const [cardTitle, setCardTitle] = useState<string>('');
	const [cardDescription, setCardDescription] = useState<string>('');
	const [newCardTitle, setNewCardTitle] = useState<string>('');
	const [newCardDescription, setNewCardDescription] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const [createCard, createCardResponse] = useCreateCardMutation();
	const [deleteCard, deleteCardResponse] = useDeleteCardMutation();
	const [updateCard] = useUpdateCardMutation();
	const { id: boardID } = useAppSelector(({ board }) => board);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (title) setCardTitle(title.toString());
		if (description) setCardDescription(description.toString());
		if (id) setCardID(id);
	}, [title, description, id]);

	useEffect(() => {
		if (createCardResponse.isSuccess) {
			const card = createCardResponse.data.card;
			setCardID(card.id);
			dispatch(addCard({ card }));
		}
		if (deleteCardResponse.isSuccess) {
			const id = deleteCardResponse.data.id;
			dispatch(removeCard({ id }));
		}
	}, [dispatch, createCardResponse, deleteCardResponse]);

	const onEditClick = () => {
		setIsEditable(!isEditable);
		setNewCardTitle(cardTitle);
		setNewCardDescription(cardDescription);
		setIsError(false);
	};

	const onDeleteClick = () => {
		deleteCard({ boardID, id: cardID });
	};

	const onSaveClick = () => {
		if (isError) {
			return;
		}

		if (cardTitle !== newCardTitle || cardDescription !== newCardDescription) {
			updateCard({
				id: cardID,
				boardID,
				title: newCardTitle,
				description: newCardDescription,
				type,
			});
			setCardTitle(newCardTitle);
			setCardDescription(newCardDescription);
			setIsEditable(!isEditable);
		}
	};

	const onCardTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewCardTitle(event.target.value);
		if (event.target.value === '' && newCardDescription === '') {
			setIsError(true);
		}
	};

	const onCardDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setIsError(false);
		setNewCardDescription(event.target.value);
		if (event.target.value === '' && newCardTitle === '') {
			setIsError(true);
		}
	};

	const onCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError) {
			return;
		}

		setIsEditable(!isEditable);
		createCard({
			boardID,
			title: newCardTitle,
			description: newCardDescription,
		});
	};

	return (
		<>
			{title || description ? (
				<ChakraCard
					boxShadow="1px 1px 3px .5px black"
					w="100%"
					p=".5rem"
					minH="15rem"
					borderRadius="0"
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
										borderRadius="0"
										aria-label="Save card"
										icon={<CheckIcon w="1.5rem" h="1.5rem" />}
									/>
									<IconButton
										onClick={onEditClick}
										size="sm"
										bgColor="white"
										borderRadius="0"
										aria-label="Cancel edit card"
										icon={<CloseIcon w="1.5rem" h="1.5rem" />}
									/>
								</>
							) : (
								<>
									<IconButton
										onClick={onEditClick}
										size="sm"
										bgColor="white"
										borderRadius="0"
										aria-label="Edit card"
										icon={<EditIcon w="1.5rem" h="1.5rem" />}
									/>
									<IconButton
										onClick={onDeleteClick}
										size="sm"
										bgColor="white"
										borderRadius="0"
										aria-label="Delete card"
										icon={<DeleteIcon w="1.5rem" h="1.5rem" />}
									/>
								</>
							)}
						</ButtonGroup>
					</Flex>
				</ChakraCard>
			) : (
				<ChakraCard
					boxShadow="1px 1px 3px .5px black"
					borderRadius="0"
					minH="15rem"
				>
					{!isEditable ? (
						<CardBody p="0" boxSizing="border-box">
							<IconButton
								onClick={onEditClick}
								aria-label="Add card"
								icon={<AddIcon />}
								minH="15rem"
								display="block"
								m="0"
								w="100%"
								borderRadius="0"
							/>
						</CardBody>
					) : (
						<form onSubmit={onCreateSubmit}>
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
											borderRadius="0"
											aria-label="Save card"
											icon={<CheckIcon w="1rem" h="1rem" />}
										/>
										<IconButton
											onClick={onEditClick}
											size="sm"
											bgColor="white"
											borderRadius="0"
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
