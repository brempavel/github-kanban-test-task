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

import { useCreateBoardMutation } from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { BoardCreatedModal } from '../BoardCreatedModal.tsx';

export const BoardNameInput = () => {
	const [name, setName] = useState<string>('');
	const [boardID, setBoardID] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [createBoard, response] = useCreateBoardMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (response.isSuccess) {
			const { id, name, cards } = response.data.board;
			dispatch(setBoard({ id, name, cards }));
			setBoardID(id);

			navigate(`/boards/${id}`);
		}
	}, [response, navigate, dispatch, boardID]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setName(event.target.value);
		if (event.target.value === '') {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError) {
			return;
		}

		createBoard({ name });
		setName('');
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<FormControl isInvalid={isError}>
					<Flex w="30vw" m="3rem 0">
						<Input
							borderRadius="0"
							placeholder="Enter a board name here..."
							onChange={onChange}
							value={name}
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
