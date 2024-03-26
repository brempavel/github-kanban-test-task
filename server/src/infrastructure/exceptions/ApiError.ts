export class ApiError extends Error {
	constructor(
		public status: number,
		message: string,
		public errors: string[] = []
	) {
		super(message);
	}

	static BadRequest(message: string, errors: string[] = []) {
		return new ApiError(400, message, errors);
	}
}
