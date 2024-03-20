import { NextFunction, Request, Response } from 'express';

import { get, post, patch, del, controller } from '../decorators';
import { MongoBoardRepository } from '../../db/mongo/MongoBoardRepository';
import { MongoCardRepository } from '../../db/mongo/MongoCardRepository';
import { BoardService, CardService } from '../../../core/services';

@controller('/api/boards')
class BoardController {
	@post('/new')
	async createBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { name } = req.body;

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.createBoard(name);

			res.json({
				data: board,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID')
	async updateBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, name } = req.body;

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.updateBoard({ id, name });

			res.json({
				data: board,
			});
		} catch (e) {
			next(e);
		}
	}

	@del('/:boardID')
	async deleteBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.body;

			const boardService = new BoardService(new MongoBoardRepository());
			const boardID = await boardService.deleteBoard(id);

			res.json({
				data: boardID,
			});
		} catch (e) {
			next(e);
		}
	}

	@get('/:boardID')
	async getBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.body;

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.getBoard(id);

			res.json({
				data: board,
			});
		} catch (e) {
			next(e);
		}
	}

	@post('/:boardID/cards/new')
	async createCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, title, description } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.createCard({
				boardID,
				title,
				description,
			});
			console.log(card);

			res.json({
				data: card,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID/cards/:cardID')
	async updateCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, boardID, title, description } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.updateCard({
				id,
				boardID,
				title,
				description,
			});

			res.json({
				data: card,
			});
		} catch (e) {
			next(e);
		}
	}

	@del('/:boardID/cards/:cardID')
	async deleteCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, id } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const cardID = await cardService.deleteCard({ boardID, id });

			res.json({
				data: cardID,
			});
		} catch (e) {
			next(e);
		}
	}
}
