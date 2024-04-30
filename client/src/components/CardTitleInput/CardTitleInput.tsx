import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	FormControl,
	CardHeader,
	Input,
	Flex,
	ButtonGroup,
	IconButton,
} from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';

import { useCreateCardMutation } from '../../store/api/boardsApi';
import { useAppSelector } from '../../hooks/useAppSelector';

interface CardTitleInputProps {
	title: string;
	columnID: string;
	onEditClick: () => void;
}

export const CardTitleInput = ({
	columnID,
	onEditClick,
}: CardTitleInputProps) => {
	const { id: boardID, columns } = useAppSelector(({ board }) => board);

	const [newCardTitle, setNewCardTitle] = useState<string>('');
	const [lastCardOrder, setLastCardOrder] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);

	const [createCard] = useCreateCardMutation();

	useEffect(() => {
		const column = columns && columns.find(({ id }) => id === columnID);
		if (column && column.cards.length > 0) {
			const lastCardOrder = Math.max(...column.cards.map(({ order }) => order));
			setLastCardOrder(lastCardOrder);
		}
	}, [columns, columnID]);

	const onCardTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIsError(false);
		setNewCardTitle(event.target.value);
		if (!event.target.value) {
			setIsError(true);
		}
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isError || !newCardTitle) {
			setIsError(true);
			return;
		}

		onEditClick();
		createCard({
			boardID,
			columnID,
			title: newCardTitle,
			order: lastCardOrder + 1000,
		});
		setLastCardOrder((order) => order + 1000);
	};

	return (
		<form onSubmit={onSubmit}>
			<FormControl isInvalid={isError}>
				<CardHeader p="1rem">
					<Input
						onChange={onCardTitleChange}
						value={newCardTitle}
						placeholder="Title"
					/>
				</CardHeader>
				<Flex justifyContent="end">
					<ButtonGroup m="0 1rem 1rem 0">
						<IconButton
							type="submit"
							size="sm"
							aria-label="Save card"
							icon={<CheckIcon w="1rem" h="1rem" />}
							bgColor="white"
						/>
						<IconButton
							onClick={onEditClick}
							size="sm"
							aria-label="Cancel edit card"
							icon={<CloseIcon w="1rem" h="1rem" />}
							bgColor="white"
						/>
					</ButtonGroup>
				</Flex>
			</FormControl>
		</form>
	);
};
