import { useEffect } from 'react';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Text,
	ModalCloseButton,
} from '@chakra-ui/react';

interface BoardCreatedModalProps {
	boardID: string;
}

export const BoardCreatedModal = ({ boardID }: BoardCreatedModalProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	useEffect(() => {
		onOpen();
	}, [onOpen, boardID]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader alignSelf="center">
					Board successfully created!
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb="1rem">
					<Text textAlign="center">
						Your Board ID is: <Text as="b">{boardID}</Text>. <br />
						Make sure to keep a record of your Board ID to find it later!
					</Text>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
