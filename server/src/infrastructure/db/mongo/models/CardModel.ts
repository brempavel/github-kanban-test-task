import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
	title: { type: String },
	description: { type: String },
	order: { type: Number, required: true },
});

export const CardModel = model('Card', cardSchema);
