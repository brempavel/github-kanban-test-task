import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { AppRouter } from './AppRouter';

import './controllers/BoardController/BoardController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(AppRouter.getInstance());

(() => {
	try {
		dotenv.config();
		const PORT = process.env.PORT;

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
})();
