import { useEffect, useState } from 'react';
import {
	Card as ChakraCard,
	Heading,
	CardHeader,
	IconButton,
	Button,
	Tooltip,
	CardBody,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';

import { CardProps } from './interfaces';
import { CardModal } from '../CardModal';
import { CardTitleInput } from '../CardTitleInput';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setEditable } from '../../store/slices/boardSlice';
import { useDeleteCardMutation } from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Card = ({ id, title, description, columnID }: CardProps) => {
	const { id: boardID } = useAppSelector(({ board }) => board);

	const [cardID, setCardID] = useState<string>('');
	const [cardTitle, setCardTitle] = useState<string>('');
	const [cardDescription, setCardDescription] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const [deleteCard] = useDeleteCardMutation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) setCardID(id);
		if (title) setCardTitle(title);
		if (description) setCardDescription(description);
	}, [id, title, description]);

	const onEditClick = () => {
		setIsEditable(!isEditable);
		dispatch(setEditable({ editable: !isEditable }));
	};

	const onDeleteClick = () => {
		deleteCard({ boardID, columnID, id });
	};

	return (
		<>
			{title ? (
				<ChakraCard
					boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
					w="100%"
					mb="1rem"
					h="fit-content"
				>
					<Button
						onClick={onEditClick}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						alignItems="start"
						variant="card"
						flexDir="column"
						p="1rem"
						h="100%"
						w="100%"
						overflow="hidden"
					>
						<CardHeader p="0">
							<Heading size="sm">{cardTitle}</Heading>
						</CardHeader>
						{description && (
							<CardBody p="0" mt=".5rem">
								<Tooltip label="This card has a description">
									<HamburgerIcon />
								</Tooltip>
							</CardBody>
						)}
					</Button>
					{isHovered && (
						<IconButton
							onClick={onDeleteClick}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							pos="absolute"
							top="0"
							right="0"
							m=".5rem"
							size="sm"
							aria-label="Delete card"
							icon={<DeleteIcon />}
							bgColor="white"
						/>
					)}
					{isEditable && (
						<CardModal
							id={cardID}
							columnID={columnID}
							title={cardTitle}
							description={cardDescription}
							onEditClick={onEditClick}
						/>
					)}
				</ChakraCard>
			) : (
				<ChakraCard boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)">
					{!isEditable ? (
						<IconButton
							onClick={onEditClick}
							aria-label="Add card"
							icon={<AddIcon />}
							w="100%"
						/>
					) : (
						<CardTitleInput
							title={cardTitle}
							columnID={columnID}
							onEditClick={onEditClick}
						/>
					)}
				</ChakraCard>
			)}
		</>
	);
};
