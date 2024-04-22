import { Box, Center } from '@chakra-ui/react';

import { IBoardColumn } from './interfaces';
import { ColumnTitle } from '../ColumnTitle';

export const Column = ({ title, children, id }: IBoardColumn) => {
	return (
		<Box minW="21rem">
			<Center>
				<Box
					w="20rem"
					pos="relative"
					borderRadius="lg"
					boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
					bgColor="white"
					p="1rem"
				>
					<ColumnTitle id={id} title={title} />
					<Box overflow="auto" p=".1rem" maxH="70vh">
						{children}
					</Box>
				</Box>
			</Center>
		</Box>
	);
};
