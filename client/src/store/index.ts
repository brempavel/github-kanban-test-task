import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { boardsApi } from './api/boardsApi';
import boardReducer from './slices/boardSlice';

const store = configureStore({
	reducer: {
		board: boardReducer,
		[boardsApi.reducerPath]: boardsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(boardsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
