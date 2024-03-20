import { NextFunction, Request, Response } from 'express';

import { post, controller } from '../decorators';

@controller('/api/cards')
class CardController {
	@post('/')
	async createCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
		} catch (e) {
			next(e);
		}
	}
}
