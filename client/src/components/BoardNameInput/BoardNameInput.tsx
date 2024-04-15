import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';

import {
	useCreateBoardMutation,
	useLazyGetBoardQuery,
} from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { BoardCreatedModal } from '../BoardCreatedModal.tsx';

export const BoardNameInput = () => {
	const [title, setTitle] = useState<string>('');
	const [boardID, setBoardID] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [createBoard, createBoardResponse] = useCreateBoardMutation();
	const [getBoard, getBoardResponse] = useLazyGetBoardQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (createBoardResponse.isSuccess) {
			const { id } = createBoardResponse.data.board;
			getBoard({ id });
		}
	}, [getBoard, createBoardResponse]);

	useEffect(() => {
		if (getBoardResponse.isSuccess) {
			const { id, title, columns } = getBoardResponse.data.board;
			dispatch(setBoard({ id, title, columns }));
			setBoardID(id);

			navigate(`/boards/${id}`);
		}
	}, [getBoardResponse, navigate, dispatch]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError || !title) {
			setIsError(true);
			return;
		}

		createBoard({ title });
		setTitle('');
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<FormControl isInvalid={isError}>
					<Flex w="30vw">
						<Input
							borderRadius="0"
							placeholder="Enter a board name here..."
							onChange={onChange}
							value={title}
							mr=".5rem"
						/>
						{isError && (
							<FormErrorMessage pos="absolute" top="2.5rem">
								Name is required
							</FormErrorMessage>
						)}
						<Button type="submit" borderRadius="0">
							Save
						</Button>
					</Flex>
				</FormControl>
			</form>
			{boardID && <BoardCreatedModal boardID={boardID} />}
		</>
	);
};
