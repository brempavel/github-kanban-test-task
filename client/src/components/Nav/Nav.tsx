import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';

import { SearchBar } from '../SearchBar';
import { CreateBoardMenu } from '../CreateBoardMenu';
import { useDeleteBoardMutation } from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setBoard } from '../../store/slices/boardSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Nav = () => {
	const { id } = useAppSelector(({ board }) => board);
	const [boardID, setBoardID] = useState<string>('');
	const [deleteBoard] = useDeleteBoardMutation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const boardID = localStorage.getItem('boardID');
		if (boardID) {
			navigate(`/boards/${boardID}`);
		}
	}, [navigate]);

	useEffect(() => {
		setBoardID(id);
	}, [id]);

	const onClick = () => {
		deleteBoard({ id });
		dispatch(setBoard({ id: '' }));
		setBoardID('');
		navigate('/');
	};

	return (
		<Flex gap=".5rem" m="1rem" h="5vh">
			<SearchBar />
			<CreateBoardMenu />
			{boardID && (
				<Button minW="7rem" onClick={onClick} variant="delete">
					Delete board
				</Button>
			)}
		</Flex>
	);
};
