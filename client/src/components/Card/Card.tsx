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
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';

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
					h="fit-content"
				>
					<Button
						onClick={onEditClick}
						alignItems="start"
						variant="card"
						flexDir="column"
						p="1rem"
						h="100%"
						w="100%"
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
