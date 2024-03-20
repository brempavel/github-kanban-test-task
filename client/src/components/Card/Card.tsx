import {
	Card as ChakraCard,
	Heading,
	CardBody,
	Text,
	Center,
	Button,
} from '@chakra-ui/react';

interface CardProps {
	title: string;
	description: string;
}

export const Card = ({ title, description }: CardProps) => {
	const onEditClick = () => {};

	const onDeleteClick = () => {};

	return (
		<ChakraCard w="100%" p="1rem">
			<CardBody>
				<Center>
					<Heading size="md">{title}</Heading>
				</Center>
				<Center>
					<Text>{description}</Text>
				</Center>
				<Button onClick={onEditClick}>Edit</Button>
				<Button onClick={onDeleteClick}>Delete</Button>
			</CardBody>
		</ChakraCard>
	);
};
