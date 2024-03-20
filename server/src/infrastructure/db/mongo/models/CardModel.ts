import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
	title: { type: String },
	description: { type: String },
});

export const CardModel = model('Card', cardSchema);
