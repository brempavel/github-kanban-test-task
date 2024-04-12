import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Box,
	ButtonGroup,
	Center,
	FormControl,
	FormErrorMessage,
	Heading,
	IconButton,
	Input,
} from '@chakra-ui/react';

import { IBoardColumn } from './interfaces';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
	useDeleteColumnMutation,
	useUpdateColumnMutation,
} from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';

export const Column = ({ title, children, id }: IBoardColumn) => {
	const { id: boardID } = useAppSelector(({ board }) => board);

	const [columnID, setColumnID] = useState<string>('');
	const [columnTitle, setColumnTitle] = useState<string>('');
	const [newTitle, setNewTitle] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const [updateColumn] = useUpdateColumnMutation();
	const [deleteColumn] = useDeleteColumnMutation();

	useEffect(() => {
		setColumnID(id);
		setColumnTitle(title.toString());
	}, [id, title]);

	const onEditClick = () => {
		setIsError(false);
		setNewTitle(columnTitle);
		setIsEditable(!isEditable);
	};

	const onDeleteClick = () => {
		deleteColumn({ boardID, id: columnID });
	};

	const onNewTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (columnTitle === newTitle) return;

		if (isError || !newTitle) {
			setIsError(true);
			return;
		}

		setColumnTitle(newTitle);
		setIsEditable(!isEditable);
		updateColumn({ boardID, id: columnID, title: newTitle });
	};

	return (
		<Box minW="20rem" pos="relative" border="1px solid white" p="1rem">
			<Center>
				{!isEditable ? (
					<>
						<Heading size="md" mb="3rem" textOverflow="ellipsis">
							{columnTitle}
						</Heading>
						<ButtonGroup
							pos="absolute"
							gap="0rem"
							top="-.2rem"
							right="0"
							size="sm"
						>
							<IconButton
								onClick={onEditClick}
								borderRadius="0"
								bgColor="white"
								aria-label="Edit Board"
								icon={<EditIcon w="1rem" h="1rem" />}
							/>
							<IconButton
								onClick={onDeleteClick}
								borderRadius="0"
								bgColor="white"
								aria-label="Delete board"
								icon={<DeleteIcon w="1rem" h="1rem" />}
							/>
						</ButtonGroup>
					</>
				) : (
					<form onSubmit={onSubmit}>
						<FormControl isInvalid={isError}>
							<Input
								placeholder="Column title..."
								value={newTitle}
								onChange={onNewTitleChange}
								mb="2rem"
								w="10rem"
							/>
							{isError && (
								<FormErrorMessage pos="absolute" top="2.5rem">
									Title is required
								</FormErrorMessage>
							)}
							<ButtonGroup
								spacing=".5rem"
								pos="absolute"
								top=".2rem"
								right="-5rem"
								size="sm"
							>
								<IconButton
									type="submit"
									borderRadius="0"
									bgColor="white"
									aria-label="Save column"
									icon={<CheckIcon w="1rem" h="1rem" />}
								/>
								<IconButton
									onClick={onEditClick}
									borderRadius="0"
									bgColor="white"
									aria-label="Cancel create column"
									icon={<CloseIcon w="1rem" h="1rem" />}
								/>
							</ButtonGroup>
						</FormControl>
					</form>
				)}
			</Center>
			<Box>{children}</Box>
		</Box>
	);
};
