import { CloseIcon } from '@chakra-ui/icons';
import {
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	IconButton,
	Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';

interface BoardCreatedModalProps {
	boardID: string;
}

export const BoardCreatedModal = ({ boardID }: BoardCreatedModalProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	useEffect(() => {
		onOpen();
	}, [onOpen]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>You successfully created a new board!</ModalHeader>
					<ModalBody>
						<Text textAlign="center">
							Your Board ID is: <Text as="b">{boardID}</Text>. Make sure to keep
							a record of your Board ID! It's essential for future reference.
						</Text>
					</ModalBody>

					<ModalFooter>
						<IconButton
							aria-label="Close modal"
							bgColor="white"
							onClick={onClose}
							icon={<CloseIcon w="1rem" h="1rem" />}
						/>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
