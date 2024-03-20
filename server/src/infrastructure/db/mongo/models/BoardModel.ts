import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
	name: { type: String, required: true },
	cardIDs: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Card',
			},
		],
		default: [],
	},
});

export const BoardModel = model('Board', boardSchema);
