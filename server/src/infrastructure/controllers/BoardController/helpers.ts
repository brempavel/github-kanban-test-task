import { CardTypes } from '@types';
import { ApiError } from '../../exceptions/ApiError';

export const validateBoard = ({ name }: { name: string }) => {
	if (!name) {
		throw ApiError.BadRequest('Board name shall not be empty');
	}

	return true;
};

export const validateCard = ({
	title,
	description,
	type,
	order,
}: {
	title: string;
	description: string;
	type: CardTypes;
	order: number;
}) => {
	if (!title && !description && !type && !order) {
		throw ApiError.BadRequest(
			'You shall provide title or description, or type, or order'
		);
	}
	return true;
};
