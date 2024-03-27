import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const API_URL = import.meta.env.API_URL;
const API_URL = 'http://localhost:3000';

const boardsApi = createApi({
	reducerPath: 'boards',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		createBoard: builder.mutation({
			query: ({ name }) => {
				return {
					url: `/api/boards`,
					method: 'POST',
					body: { name },
				};
			},
		}),
		updateBoard: builder.mutation({
			query: ({ id, name }) => {
				return {
					url: `/api/boards/${id}`,
					method: 'PATCH',
					body: { id, name },
				};
			},
		}),
		deleteBoard: builder.mutation({
			query: ({ id }) => {
				localStorage.removeItem('boardID');
				return {
					url: `/api/boards/${id}`,
					method: 'DELETE',
				};
			},
		}),
		getBoard: builder.query({
			query: ({ id }) => {
				return {
					url: `/api/boards/${id}`,
					method: 'GET',
				};
			},
		}),
		getBoards: builder.query({
			query: () => {
				return {
					url: '/api/boards',
					method: 'GET',
				};
			},
		}),
		createCard: builder.mutation({
			query: ({ boardID, title, description }) => {
				return {
					url: `/api/boards/${boardID}/cards`,
					method: 'POST',
					body: { boardID, title, description, type: 'todo' },
				};
			},
		}),
		updateCard: builder.mutation({
			query: ({ id, boardID, title, description, type }) => {
				return {
					url: `/api/boards/${boardID}/cards/${id}`,
					method: 'PATCH',
					body: { id, boardID, title, description, type },
				};
			},
		}),
		deleteCard: builder.mutation({
			query: ({ boardID, id }) => {
				return {
					url: `/api/boards/${boardID}/cards/${id}`,
					method: 'DELETE',
				};
			},
		}),
	}),
});

export const {
	useCreateBoardMutation,
	useUpdateBoardMutation,
	useDeleteBoardMutation,
	useLazyGetBoardQuery,
	useGetBoardsQuery,
	useCreateCardMutation,
	useUpdateCardMutation,
	useDeleteCardMutation,
} = boardsApi;
export { boardsApi };
