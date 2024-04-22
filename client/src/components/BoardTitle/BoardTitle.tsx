import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
	Box,
	Flex,
	Button,
	Heading,
	FormControl,
	Input,
} from '@chakra-ui/react';

import { useUpdateBoardMutation } from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';

export const BoardTitle = () => {
	const { id, title } = useAppSelector(({ board }) => board);

	const [boardID, setBoardID] = useState<string>('');
	const [boardTitle, setBoardTitle] = useState<string>('');
	const [newBoardTitle, setNewBoardTitle] = useState<string>('');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const [updateBoard] = useUpdateBoardMutation();

	useEffect(() => {
		setBoardID(id);
		setBoardTitle(title);
	}, [id, title]);

	const onEditClick = () => {
		setIsError(false);
		setIsEditable(!isEditable);
		setNewBoardTitle(boardTitle);
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
					<>
						<Button
							onClick={onEditClick}
							aria-label="Edit column"
							w="fit-content"
							variant="input"
						>
							<Heading size="md">{boardTitle}</Heading>
						</Button>
					</>
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
								onBlur={() => {
									onSubmit();
								}}
								w={`${newBoardTitle.length + 4}ch`}
								minW="4ch"
								maxW="30vw"
								mx="1rem"
							/>
						</FormControl>
					</form>
				)}
			</Box>
		</Flex>
	);
};
