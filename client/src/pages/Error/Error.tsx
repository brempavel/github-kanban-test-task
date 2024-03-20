import { AbsoluteCenter, Box, Center, Heading, Text } from '@chakra-ui/react';
import { NavLink } from '../../components/NavLink';

export const Error = () => {
	return (
		<Box w="100vw" h="100vh">
			<AbsoluteCenter>
				<Center>
					<Heading size="3xl">Ooops!</Heading>
				</Center>
				<Center mt="2rem">
					<Text fontSize="xl">Sorry, unexpected error has occured</Text>
				</Center>
				<Center mt="1rem">
					<NavLink to="/">
						<Text fontSize="lg" textDecor="underline">
							Return to Homepage
						</Text>
					</NavLink>
				</Center>
			</AbsoluteCenter>
		</Box>
	);
};
