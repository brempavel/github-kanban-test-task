import { NextFunction, Request, Response } from 'express';

import {
	get,
	post,
	patch,
	del,
	controller,
	bodyValidator,
} from '../decorators';
import {
	BoardService,
	CardService,
	ColumnService,
} from '../../../core/services';
import {
	MongoBoardRepository,
	MongoCardRepository,
	MongoColumnRepository,
} from '../../db/mongo';
import { ApiError } from '../../exceptions/ApiError';
import { validateBoard, validateCard } from './helpers';

@controller('/api/boards')
class BoardController {
	@post('/')
	@bodyValidator('title')
	async createBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { title } = req.body;

			validateBoard({ title });

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.createBoard(title);

			res.json({
				board,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID')
	@bodyValidator('id', 'title')
	async updateBoard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, title } = req.body;

			validateBoard({ title });

			const boardService = new BoardService(new MongoBoardRepository());
			const board = await boardService.updateBoard({ id, title });

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

	@post('/:boardID/columns')
	@bodyValidator('boardID', 'title', 'order')
	async createColumn(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, title, order } = req.body;

			const columnService = new ColumnService(new MongoColumnRepository());
			const column = await columnService.createColumn({
				boardID,
				title,
				order,
			});

			res.json({
				column,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID/columns/:columnID')
	@bodyValidator('boardID', 'id')
	async updateColumn(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, id, title, order } = req.body;

			const columnService = new ColumnService(new MongoColumnRepository());
			const column = await columnService.updateColumn({
				boardID,
				id,
				title,
				order,
			});

			res.json({
				column,
			});
		} catch (e) {
			next(e);
		}
	}

	@del('/:boardID/columns/:columnID')
	async deleteColumn(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, columnID } = req.params;

			const columnService = new ColumnService(new MongoColumnRepository());
			const id = await columnService.deleteColumn({ boardID, id: columnID });

			res.json({
				columnID: id,
			});
		} catch (e) {
			next(e);
		}
	}

	@post('/:boardID/columns/:columnID/cards')
	@bodyValidator('boardID', 'columnID', 'order')
	async createCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, columnID, order, title, description } = req.body;

			validateCard({ title, description });

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.createCard({
				boardID,
				columnID,
				order,
				title,
				description,
			});

			res.json({
				card,
			});
		} catch (e) {
			next(e);
		}
	}

	@patch('/:boardID/columns/:columnID/cards/:cardID')
	@bodyValidator('boardID', 'columnID', 'id')
	async updateCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, columnID, id, title, description, order } = req.body;

			if (!title && !description && !order) {
				throw ApiError.BadRequest('Title or description, or order required');
			}

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.updateCard({
				boardID,
				columnID,
				id,
				title,
				description,
				order,
			});

			res.json({
				card,
			});
		} catch (e) {
			next(e);
		}
	}

	@del('/:boardID/columns/:columnID/cards/:cardID')
	async deleteCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, columnID, cardID } = req.params;

			const cardService = new CardService(new MongoCardRepository());
			const id = await cardService.deleteCard({
				boardID,
				columnID,
				id: cardID,
			});

			res.json({
				cardID: id,
			});
		} catch (e) {
			next(e);
		}
	}

	@post('/:boardID/columns/:columnID/cards/:cardID')
	@bodyValidator('boardID', 'columnID', 'order', 'id', 'newColumnID')
	async swapCard(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { boardID, columnID, order, id, newColumnID } = req.body;

			const cardService = new CardService(new MongoCardRepository());
			const card = await cardService.changeColumn({
				id,
				boardID,
				columnID,
				newColumnID,
				order,
			});

			res.json({
				card,
			});
		} catch (e) {
			next(e);
		}
	}
}
