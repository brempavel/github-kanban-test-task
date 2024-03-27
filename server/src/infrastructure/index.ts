import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import { AppRouter } from './AppRouter';
import { errorMiddleware } from './middlewares/errorMiddleware';

import './controllers/BoardController';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(AppRouter.getInstance());
app.use(errorMiddleware);
app.use(express.static('dist'));
app.get('/*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'), (error) => {
		res.status(500).send(error);
	});
});

(() => {
	try {
		const PORT = process.env.PORT;

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
})();
