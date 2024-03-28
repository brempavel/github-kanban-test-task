import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
	title: { type: String },
	description: { type: String },
	type: { type: String, enum: ['todo', 'inProgress', 'done'], required: true },
	order: { type: Number, required: true },
});

export const CardModel = model('Card', cardSchema);
