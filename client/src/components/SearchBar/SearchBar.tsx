import { Button, Center, Flex, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

export const SearchBar = () => {
	const [query, setQuery] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleClick = () => {
		setQuery('');
	};

	return (
		<Center>
			<Flex w="30vw" m="5rem 0" gap=".5rem">
				<Input
					placeholder="Enter a board name or ID here..."
					onChange={handleChange}
					value={query}
				/>
				<Button onClick={handleClick}>Load</Button>
			</Flex>
		</Center>
	);
};
