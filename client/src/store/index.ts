import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { boardsApi } from './api/boardsApi';

const store = configureStore({
	reducer: {
		[boardsApi.reducerPath]: boardsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(boardsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
