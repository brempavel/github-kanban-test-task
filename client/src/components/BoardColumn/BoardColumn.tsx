import { Box, Center, Heading } from '@chakra-ui/react';

interface BoardColumnProps {
	heading: string;
	children: React.ReactNode;
}

export const BoardColumn = ({ heading, children }: BoardColumnProps) => {
	return (
		<Box>
			<Center>
				<Heading size="xl">{heading}</Heading>
			</Center>
			<Box
				w="30vw"
				h="60vh"
				outline="1px solid black"
				borderRadius="1%"
				p="1rem"
			>
				{children}
			</Box>
		</Box>
	);
};
