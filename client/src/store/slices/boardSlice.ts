import { createSlice } from '@reduxjs/toolkit';
import { Board } from '../../interfaces/Board';

const initialState: Board = {
	id: '',
	title: '',
	columns: [],
	editable: false,
};

const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setBoard: (state, action) => {
			const { id, title, columns } = action.payload;
			if (!id || !title) return;

			localStorage.setItem('boardID', id);
			state.id = id;
			state.title = title;
			state.columns = columns;
		},
		setEditable: (state, action) => {
			const { editable } = action.payload;

			state.editable = editable;
		},
	},
});

export const { setBoard, setEditable } = boardSlice.actions;

export default boardSlice.reducer;
