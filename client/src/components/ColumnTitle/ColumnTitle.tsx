import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import {
	Flex,
	Button,
	Heading,
	FormControl,
	Textarea,
	IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { useAppSelector } from '../../hooks/useAppSelector';
import {
	useUpdateColumnMutation,
	useDeleteColumnMutation,
} from '../../store/api/boardsApi';

interface ColumnTitleProps {
	id: string;
	title: string;
}

export const ColumnTitle = ({ id, title }: ColumnTitleProps) => {
	const { id: boardID } = useAppSelector(({ board }) => board);

	const [columnID, setColumnID] = useState<string>('');
	const [columnTitle, setColumnTitle] = useState<string>('');
	const [newTitle, setNewTitle] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const [updateColumn] = useUpdateColumnMutation();
	const [deleteColumn] = useDeleteColumnMutation();

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		setColumnID(id);
		setColumnTitle(title);
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
		<Flex align="center">
			{!isEditable ? (
				<Button
					onClick={onEditClick}
					aria-label="Edit column"
					justifyContent="start"
					variant="input"
					whiteSpace="wrap"
					textAlign="left"
					mb="1rem"
				>
					<Heading size="md" w="13rem">
						{columnTitle}
					</Heading>
				</Button>
			) : (
				<form onSubmit={onSubmit}>
					<FormControl isInvalid={isError}>
						<Textarea
							ref={textareaRef}
							textAlign="left"
							resize="none"
							rows={1}
							w="15rem"
							fontSize="xl"
							fontWeight="1000"
							autoFocus
							value={newTitle}
							mb="1rem"
							overflow="hidden"
							onChange={onNewTitleChange}
							onFocus={(event) => event.target.select()}
							onSubmit={() => onSubmit()}
							onBlur={() => onSubmit()}
						/>
					</FormControl>
				</form>
			)}
			<IconButton
				top="0"
				right="0"
				m="1.1rem 1rem .5rem 1rem"
				pos="absolute"
				size="sm"
				onClick={onDeleteClick}
				aria-label="Delete board"
				icon={<DeleteIcon w="1rem" h="1rem" />}
				bgColor="white"
			/>
		</Flex>
	);
};
