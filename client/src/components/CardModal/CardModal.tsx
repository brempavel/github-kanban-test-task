import { ChangeEvent, useEffect, useState } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	ButtonGroup,
	Textarea,
	Button,
	Flex,
} from '@chakra-ui/react';

import {
	useDeleteCardMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import { DeleteIcon } from '@chakra-ui/icons';
import MarkdownEditor from '@uiw/react-markdown-editor';

interface CardModalProps {
	id: string;
	columnID: string;
	title: string;
	description: string;
	onEditClick: () => void;
}

export const CardModal = ({
	id,
	columnID,
	title,
	description,
	onEditClick,
}: CardModalProps) => {
	const { id: boardID } = useAppSelector(({ board }) => board);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [newCardTitle, setNewCardTitle] = useState<string>(title);
	const [newCardDescription, setNewCardDescription] =
		useState<string>(description);
	const [isError, setIsError] = useState<boolean>(false);
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const [deleteCard] = useDeleteCardMutation();
	const [updateCard] = useUpdateCardMutation();

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	const onDeleteClick = () => {
		deleteCard({ boardID, columnID, id });
		onEditClick();
	};

	const onSaveClick = () => {
		if (isError || (!newCardTitle && !newCardDescription)) {
			setIsError(true);
			return;
		}

		if (title !== newCardTitle || description !== newCardDescription) {
			updateCard({
				id,
				boardID,
				columnID,
				title: newCardTitle,
				description: newCardDescription,
			});
			onEditClick();
		}
	};

	const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewCardTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onDescriptionChange = (value: string) => {
		setIsError(false);
		setNewCardDescription(value);
	};

	const onDescriptionSave = () => {
		if (isError || !newCardDescription) {
			setIsError(true);
			return;
		}

		setIsEditable(false);
		if (description !== newCardDescription) {
			updateCard({
				id,
				boardID,
				columnID,
				description: newCardDescription,
			});
		}
	};

	const onModalClose = () => {
		onSaveClick();
		if (!isError) {
			onEditClick();
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader></ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form>
						<FormControl mb=".5rem">
							<FormLabel>Title</FormLabel>
							<Input value={newCardTitle} onChange={onTitleChange} />
						</FormControl>
						<FormControl mb=".5rem">
							<FormLabel>Description</FormLabel>
							{!isEditable ? (
								!description.trim() ? (
									<Textarea
										resize="none"
										rows={2}
										placeholder="Add more detailed description..."
										onClick={() => setIsEditable(true)}
									/>
								) : (
									<div
										data-color-mode="light"
										onClick={() => setIsEditable(true)}
									>
										<MarkdownEditor.Markdown source={newCardDescription} />
									</div>
								)
							) : (
								<>
									<div data-color-mode="light">
										<MarkdownEditor
											autoFocus
											value={newCardDescription}
											onChange={(value) => onDescriptionChange(value)}
										/>
									</div>
									<ButtonGroup size="sm" mt=".5rem">
										<Button colorScheme="blue" onClick={onDescriptionSave}>
											Save
										</Button>
										<Button
											variant="delete"
											onClick={() => setIsEditable(false)}
										>
											Cancel
										</Button>
									</ButtonGroup>
								</>
							)}
						</FormControl>
					</form>
					<Flex flexDir="column">
						<FormLabel>Actions:</FormLabel>
						<Button
							size="sm"
							onClick={onDeleteClick}
							aria-label="Delete card"
							my=".5rem"
						>
							<DeleteIcon mr=".5rem" />
							Delete
						</Button>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
