import { Schema, model } from 'mongoose';

const columnSchema = new Schema({
	title: { type: String, required: true },
	order: { type: Number, required: true },
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

export const ColumnModel = model('Column', columnSchema);
