import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Flex,
	Button,
	Heading,
	FormControl,
	Input,
	ButtonGroup,
	IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import {
	useUpdateBoardMutation,
	useDeleteBoardMutation,
} from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';

export const BoardTitle = () => {
	const { id, title } = useAppSelector(({ board }) => board);

	const [boardID, setBoardID] = useState<string>('');
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [newBoardTitle, setNewBoardTitle] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const [updateBoard] = useUpdateBoardMutation();
	const [deleteBoard] = useDeleteBoardMutation();

	const navigate = useNavigate();

	useEffect(() => {
		setBoardID(id);
		setBoardTitle(title);
	}, [id, title]);

	const onEditClick = () => {
		setIsError(false);
		setIsEditable(!isEditable);
		setNewBoardTitle(boardTitle);
	};

	const onDeleteClick = () => {
		deleteBoard({ id: boardID });
		navigate('/');
	};

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewBoardTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		if (isError || boardTitle === newBoardTitle) {
			setIsEditable(!isEditable);
			return;
		}

		setIsEditable(!isEditable);
		updateBoard({ id: boardID, title: newBoardTitle });
		setBoardTitle(newBoardTitle);
	};

	return (
		<Flex justify="center" align="center" h="5vh">
			<Box pos="relative" w="fit-content">
				{!isEditable ? (
					<Button
						onClick={onEditClick}
						aria-label="Edit column"
						bgColor="white"
						w="max-content"
					>
						<Heading size="md">{boardTitle}</Heading>
					</Button>
				) : (
					<form onSubmit={onSubmit}>
						<FormControl isInvalid={isError}>
							<Input
								fontSize="xl"
								fontWeight="1000"
								autoFocus
								onChange={onChange}
								value={newBoardTitle}
								onFocus={(event) => event.target.select()}
								onBlur={() => onSubmit()}
								width={`${newBoardTitle.length + 4}ch`}
							/>
							<ButtonGroup pos="absolute" size="sm" top=".2rem" ml=".5rem">
								<IconButton
									onClick={onDeleteClick}
									bgColor="white"
									aria-label="Delete board"
									icon={<DeleteIcon w="1rem" h="1rem" />}
								/>
							</ButtonGroup>
						</FormControl>
					</form>
				)}
			</Box>
		</Flex>
	);
};
