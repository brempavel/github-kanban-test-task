import { ApiError } from '../../exceptions/ApiError';

export const validateBoard = ({ title }: { title: string }) => {
	if (!title) {
		throw ApiError.BadRequest('Board name shall not be empty');
	}

	return true;
};

export const validateCard = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	if (!title && !description) {
		throw ApiError.BadRequest('You shall provide title or description');
	}
	return true;
};
