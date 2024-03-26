import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Flex, Input } from '@chakra-ui/react';

import { useLazyGetBoardQuery } from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';

export const SearchBar = () => {
	const [boardID, setBoardID] = useState<string>('');
	const [getBoard, response] = useLazyGetBoardQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (response.isSuccess) {
			const { id, name, cards } = response.data.board;
			dispatch(setBoard({ id, name, cards }));
			navigate(`/boards/${id}`);
		}
	}, [response, navigate, dispatch]);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBoardID(event.target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		getBoard({ id: boardID });
		setBoardID('');
	};

	return (
		<form onSubmit={onSubmit}>
			<Flex w="30vw" m="3rem 0">
				<Input
					borderRadius="0"
					placeholder="Enter a board ID here..."
					onChange={onChange}
					value={boardID}
					mr=".5rem"
				/>
				<Button type="submit" borderRadius="0">
					Load
				</Button>
			</Flex>
		</form>
	);
};
