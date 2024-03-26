import mongoose from 'mongoose';
import dotenv from 'dotenv';

export class MongoRepository {
	private static instance: MongoRepository;
	constructor() {
		dotenv.config();
		mongoose.connect(process.env.MONGO_URI).then(() => {
			console.log(`Connected to mongo: ${process.env.MONGO_URI}`);
		});
	}

	static getInstance(): MongoRepository {
		if (!MongoRepository.instance) {
			MongoRepository.instance = new MongoRepository();
		}

		return MongoRepository.instance;
	}
}
