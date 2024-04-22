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
	Textarea,
	ModalFooter,
	IconButton,
} from '@chakra-ui/react';

import {
	useDeleteCardMutation,
	useUpdateCardMutation,
} from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import { DeleteIcon } from '@chakra-ui/icons';

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

	const onDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setIsError(false);
		setNewCardDescription(event.target.value);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onSaveClick();
				if (!isError) {
					onEditClick();
					onClose();
				}
			}}
		>
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
							<Textarea
								value={newCardDescription}
								onChange={onDescriptionChange}
							/>
						</FormControl>
					</form>
				</ModalBody>
				<ModalFooter>
					<IconButton
						onClick={onDeleteClick}
						aria-label="Delete card"
						icon={<DeleteIcon />}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
