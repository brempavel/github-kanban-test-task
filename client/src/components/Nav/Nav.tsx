import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Image } from '@chakra-ui/react';

import { SearchBar } from '../SearchBar';
import { BoardNameInput } from '../BoardNameInput';

export const Nav = () => {
	const [isSearchable, setIsSearchable] = useState<boolean>(true);
	const navigate = useNavigate();
	const handleClick = () => {
		setIsSearchable(!isSearchable);
	};

	useEffect(() => {
		const boardID = localStorage.getItem('boardID');
		if (boardID) {
			navigate(`/boards/${boardID}`);
		}
	}, [navigate]);

	return (
		<>
			<Flex
				align="center"
				gap=".5rem"
				pos="fixed"
				left="50%"
				transform="translate(-50%, 0)"
				m="3rem 0"
			>
				<NavLink to="/">
					<Image src="/logo.png" alt="Homepage" w="3rem" h="3rem" />
				</NavLink>
				<Button onClick={handleClick} borderRadius="0">
					{!isSearchable ? 'Search Boards' : '+ Add New Board'}
				</Button>
				{isSearchable ? <SearchBar /> : <BoardNameInput />}
			</Flex>
			{/* Spacer */}
			<Box h="10rem" />
		</>
	);
};
