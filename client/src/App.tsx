import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';

import { SearchBar } from './components/SearchBar';
import { BoardNameInput } from './components/BoardNameInput';

function App() {
	const [isSearchable, setIsSearchable] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		const boardID = localStorage.getItem('boardID');
		if (boardID) {
			navigate(`/boards/${boardID}`);
		}
	}, [navigate]);

	const handleClick = () => {
		setIsSearchable(!isSearchable);
	};

	return (
		<Box userSelect="none">
			<Flex align="center" justify="center" gap=".5rem">
				<Button onClick={handleClick} w="10rem" borderRadius="0">
					{!isSearchable ? 'Search Boards' : '+ Add New Board'}
				</Button>
				{isSearchable ? <SearchBar /> : <BoardNameInput />}
			</Flex>
			<Outlet />
		</Box>
	);
}

export default App;
