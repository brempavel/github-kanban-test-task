import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../interfaces/Board';

const initialState: Board = {
	id: '',
	title: '',
	columns: [],
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			const { id, title, columns } = action.payload;
			localStorage.setItem('boardID', id);
			state.id = id;
			state.title = title;
			state.columns = columns;
		},
	},
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
