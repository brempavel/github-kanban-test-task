import { createSlice } from '@reduxjs/toolkit';

interface BoardState {
	id: string;
	name: string;
}

const initialState: BoardState = {
	id: '',
	name: '',
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			const { id, name } = action.payload;
			state.id = id;
			state.name = name;
		},
	},
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
