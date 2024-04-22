import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { SearchBar } from '../SearchBar';
import { CreateBoardMenu } from '../CreateBoardMenu';

export const Nav = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const boardID = localStorage.getItem('boardID');
		if (boardID) {
			navigate(`/boards/${boardID}`);
		}
	}, [navigate]);

	return (
		<Flex gap=".5rem" m="1rem" h="5vh">
			<SearchBar />
			<CreateBoardMenu />
		</Flex>
	);
};
