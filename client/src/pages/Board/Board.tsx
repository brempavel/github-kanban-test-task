import { Center, Flex } from '@chakra-ui/react';
import { BoardColumn } from '../../components/BoardColumn';
import { Card } from '../../components/Card';

export const Board = () => {
	return (
		<Center>
			<Flex gap="1rem">
				<BoardColumn heading="To Do">
					<Card title="hello" description="world" />
				</BoardColumn>
				<BoardColumn heading="In Progress">a</BoardColumn>
				<BoardColumn heading="Done">a</BoardColumn>
			</Flex>
		</Center>
	);
};
