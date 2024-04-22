import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
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
					bgColor="white"
					w="15rem"
					overflow="hidden"
					mb="1.3rem"
					justifyContent="start"
				>
					<Heading size="md">{columnTitle}</Heading>
				</Button>
			) : (
				<form onSubmit={onSubmit}>
					<FormControl isInvalid={isError}>
						<Textarea
							resize="none"
							rows={1}
							onInput={(target) => console.log(target)}
							w="15rem"
							fontSize="xl"
							fontWeight="1000"
							autoFocus
							onChange={onNewTitleChange}
							value={newTitle}
							mb="1rem"
							onFocus={(event) => event.target.select()}
							onSubmit={() => onSubmit()}
							onBlur={() => onSubmit()}
						/>
					</FormControl>
				</form>
			)}
			<IconButton
				top="1.3rem"
				right="1rem"
				pos="absolute"
				size="sm"
				onClick={onDeleteClick}
				bgColor="white"
				aria-label="Delete board"
				icon={<DeleteIcon w="1rem" h="1rem" />}
			/>
		</Flex>
	);
};
