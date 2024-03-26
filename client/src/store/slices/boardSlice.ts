import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../interfaces/Board';

const initialState: Board = {
	id: '',
	name: '',
	cards: [],
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			const { id, name, cards } = action.payload;
			localStorage.setItem('boardID', id);
			state.id = id;
			state.name = name;
			state.cards = cards;
		},
		setCards: (state, action) => {
			const { cards } = action.payload;
			state.cards = cards;
		},
		addCard: (state, action) => {
			const { card } = action.payload;
			state.cards.push(card);
		},
		removeCard: (state, action) => {
			const { id } = action.payload;
			state.cards.splice(
				state.cards.findIndex((card) => card.id === id),
				1
			);
		},
	},
});

export const { setBoard, setCards, addCard, removeCard } = boardSlice.actions;

export default boardSlice.reducer;
