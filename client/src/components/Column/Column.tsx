import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	IconButton,
	Textarea,
} from '@chakra-ui/react';

import { IBoardColumn } from './interfaces';
import { DeleteIcon } from '@chakra-ui/icons';
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

	const onNewTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setIsError(false);
		setNewTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		if (isError || columnTitle === newTitle) {
			setIsEditable(!isEditable);
			return;
		}

		setColumnTitle(newTitle);
		setIsEditable(!isEditable);
		updateColumn({ boardID, id: columnID, title: newTitle });
	};

	return (
		<Box minW="21rem">
			<Box
				w="20rem"
				pos="relative"
				borderRadius="lg"
				boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
				p="1rem"
			>
				<Flex align="center" mb="1rem">
					{!isEditable ? (
						<Button
							onClick={onEditClick}
							aria-label="Edit column"
							bgColor="white"
							w="max-content"
						>
							<Heading size="md">{columnTitle}</Heading>
						</Button>
					) : (
						<form onSubmit={onSubmit}>
							<FormControl isInvalid={isError}>
								<Textarea
									resize="none"
									fontSize="xl"
									fontWeight="1000"
									autoFocus
									onChange={onNewTitleChange}
									value={newTitle}
									mb="1rem"
									onFocus={(event) => event.target.select()}
									onSubmit={() => onSubmit()}
									onBlur={() => onSubmit()}
									w={`${newTitle.length + 3}ch`}
								/>
							</FormControl>
						</form>
					)}
					<IconButton
						right="1rem"
						pos="absolute"
						size="sm"
						onClick={onDeleteClick}
						bgColor="white"
						aria-label="Delete board"
						icon={<DeleteIcon w="1rem" h="1rem" />}
					/>
				</Flex>
				<Box overflow="auto" p=".1rem" maxH="73vh">
					{children}
				</Box>
			</Box>
		</Box>
	);
};
