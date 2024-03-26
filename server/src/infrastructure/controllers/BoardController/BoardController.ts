import { NextFunction, Request, Response } from 'express';

import {
	get,
	post,
	patch,
	del,
	controller,
	bodyValidator,
} from '../decorators';
import { BoardService, CardService } from '../../../core/services';
import { MongoBoardRepository, MongoCardRepository } from '../../db/mongo';

@controller('/api/boards')
class BoardController {
	@post('/')
	@bodyValidator('name')
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
				board,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID')
	@bodyValidator('id', 'name')
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
				board,
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
			const id = req.params.boardID;

			const boardService = new BoardService(new MongoBoardRepository());
			const boardID = await boardService.deleteBoard(id);

			res.json({
				boardID,
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
			const id = req.params.boardID;

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.getBoard(id);

			res.json({
				board,
			});
		} catch (e) {
			next(e);
		}
	}

	@get('/')
	async getBoards(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const boardService = new BoardService(new MongoBoardRepository());
			const boards = await boardService.getBoards();

			res.json({
				boards,
			});
		} catch (e) {
			next(e);
		}
	}

	@post('/:boardID/cards')
	@bodyValidator('boardID', 'type', 'order')
	async createCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, title, description, type, order } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.createCard({
				boardID,
				title,
				description,
				type,
				order,
			});

			res.json({
				card,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID/cards/:cardID')
	@bodyValidator('boardID', 'id')
	async updateCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, boardID, title, description, type, order } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.updateCard({
				id,
				boardID,
				title,
				description,
				type,
				order,
			});

			res.json({
				card,
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
			const { boardID, cardID } = req.params;

			const cardService = new CardService(new MongoCardRepository());
			const id = await cardService.deleteCard({ boardID, id: cardID });

			res.json({
				id,
			});
		} catch (e) {
			next(e);
		}
	}
}
