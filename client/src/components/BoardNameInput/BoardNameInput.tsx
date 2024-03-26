import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Flex, Input } from '@chakra-ui/react';

import { useCreateBoardMutation } from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';
import { BoardCreatedModal } from '../Modal/BoardCreatedModal';

export const BoardNameInput = () => {
	const [name, setName] = useState<string>('');
	const [boardID, setBoardID] = useState<string | null>(null);
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
		setName(event.target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		createBoard({ name });
		setName('');
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<Flex w="30vw" m="3rem 0">
					<Input
						borderRadius="0"
						placeholder="Enter a board name here..."
						onChange={onChange}
						value={name}
						mr=".5rem"
					/>
					<Button type="submit" borderRadius="0">
						Save
					</Button>
				</Flex>
			</form>
			{boardID && <BoardCreatedModal boardID={boardID} />}
		</>
	);
};
