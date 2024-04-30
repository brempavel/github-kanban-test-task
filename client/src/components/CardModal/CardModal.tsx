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
	ModalFooter,
	IconButton,
	ButtonGroup,
	Textarea,
	Button,
} from '@chakra-ui/react';

import {
	useDeleteCardMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
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
	}, [onOpen, title]);

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
						<FormControl>
							<FormLabel>Title</FormLabel>
							<Input value={newCardTitle} onChange={onTitleChange} />
						</FormControl>
						<FormControl>
							<FormLabel>Description</FormLabel>
							{!isEditable ? (
								!description ? (
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
								<div data-color-mode="light">
									<MarkdownEditor
										value={newCardDescription}
										onChange={(value) => onDescriptionChange(value)}
									/>
									<ButtonGroup size="sm" mt=".5rem">
										<Button
											colorScheme="blue"
											onClick={onDescriptionSave}
											aria-label="Save description"
										>
											Save
										</Button>
										<Button
											variant="red"
											onClick={() => setIsEditable(false)}
											aria-label="Discard description changes"
										>
											Cancel
										</Button>
									</ButtonGroup>
								</div>
							)}
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<IconButton
							onClick={onModalClose}
							aria-label="Save card"
							icon={<CheckIcon />}
							bgColor="white"
						/>
						<IconButton
							onClick={onDeleteClick}
							aria-label="Delete card"
							icon={<DeleteIcon />}
							bgColor="white"
						/>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
