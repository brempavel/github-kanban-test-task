import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { useLazyGetBoardQuery } from '../../store/api/boardsApi';
import { setBoard } from '../../store/slices/boardSlice';

export const SearchBar = () => {
	const [boardID, setBoardID] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
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
		setIsError(false);
		setBoardID(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError || !boardID) {
			setIsError(true);
			return;
		}

		getBoard({ id: boardID });
		setBoardID('');
	};

	return (
		<form onSubmit={onSubmit}>
			<FormControl variant="floating" id="board-id" isInvalid={isError}>
				<Input onChange={onChange} value={boardID} mr=".5rem" placeholder=" " />
				<FormLabel>Search</FormLabel>
			</FormControl>
		</form>
	);
};
