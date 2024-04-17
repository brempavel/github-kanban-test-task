import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';

import {
	useCreateBoardMutation,
	useLazyGetBoardQuery,
} from '../../store/api/boardsApi.ts';
import { setBoard } from '../../store/slices/boardSlice.ts';
import { BoardCreatedModal } from '../BoardCreatedModal/index.ts';

export const BoardTitleInput = () => {
	const [title, setTitle] = useState<string>('');
	const [boardID, setBoardID] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean>(true);
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
		setBoardID(null);
	}, []);

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
				<FormControl isInvalid={isError} size="sm" variant="floating">
					<Input onChange={onChange} value={title} placeholder=" " />
					<FormLabel>Board title</FormLabel>
					{isError && (
						<FormErrorMessage>Board title is required</FormErrorMessage>
					)}
					<Button
						w="100%"
						size="sm"
						type="submit"
						isDisabled={!title ? true : false}
						mt="1rem"
					>
						Save
					</Button>
				</FormControl>
			</form>
			{boardID && <BoardCreatedModal boardID={boardID} />}
		</>
	);
};
