import { useEffect, useState } from 'react';
import {
	Card as ChakraCard,
	Heading,
	CardHeader,
	IconButton,
	Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { CardProps } from './interfaces';
import { CardModal } from '../CardModal';
import { CardTitleInput } from '../CardTitleInput';

export const Card = ({ id, title, description, columnID }: CardProps) => {
	const [cardID, setCardID] = useState<string>('');
	const [cardTitle, setCardTitle] = useState<string>('');
	const [cardDescription, setCardDescription] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);

	useEffect(() => {
		if (id) setCardID(id);
		if (title) setCardTitle(title);
		if (description) setCardDescription(description);
	}, [id, title, description]);

	const onEditClick = () => {
		setIsEditable(!isEditable);
	};

	return (
		<>
			{title ? (
				<ChakraCard
					boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
					w="100%"
					mb="1rem"
				>
					<Button onClick={onEditClick} justifyContent="start" variant="card">
						<CardHeader p="1rem">
							<Heading size="sm">{cardTitle}</Heading>
						</CardHeader>
					</Button>
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
