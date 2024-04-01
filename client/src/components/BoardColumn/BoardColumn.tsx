import { Box, Center, Heading } from '@chakra-ui/react';

import { IBoardColumn } from './interfaces';

export const BoardColumn = ({ heading, children }: IBoardColumn) => {
	return (
		<Box>
			<Center>
				<Heading size="xl" my="3rem">
					{heading}
				</Heading>
			</Center>
			<Box w="20vw" minH="60vh" p="1rem" boxShadow="2px 3px 5px .5px black">
				{children}
			</Box>
		</Box>
	);
};
