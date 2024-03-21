import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://localhost:3000';

const boardsApi = createApi({
	reducerPath: 'boards',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	endpoints: (builder) => ({
		createBoard: builder.mutation({
			query: ({ name }) => {
				return {
					url: `/boards/new`,
					method: 'POST',
					body: { name },
				};
			},
		}),
		updateBoard: builder.mutation({
			query: ({ id, name }) => {
				return {
					url: `/boards/:boardID`,
					method: 'PATCH',
					body: { id, name },
				};
			},
		}),
		deleteBoard: builder.mutation({
			query: ({ id }) => {
				return {
					url: `/boards/:boardID`,
					method: 'DELETE',
					body: { id },
				};
			},
		}),
		getBoard: builder.query({
			query: ({ id }) => {
				return {
					url: `/boards/:boardID`,
					method: 'GET',
					body: { id },
				};
			},
		}),
		getBoards: builder.query({
			query: () => {
				return {
					url: '/boards',
					method: 'GET',
				};
			},
		}),
		createCard: builder.mutation({
			query: ({ boardID, title, description }) => {
				return {
					url: `/boards/:boardID/cards/new`,
					method: 'POST',
					body: { boardID, title, description },
				};
			},
		}),
		updateCard: builder.mutation({
			query: ({ id, boardID, title, description }) => {
				return {
					url: `/boards/:boardID/cards/:cardID`,
					method: 'PATCH',
					body: { id, boardID, title, description },
				};
			},
		}),
		deleteCard: builder.mutation({
			query: ({ boardID, id }) => {
				return {
					url: `/boards/:boardID/cards/:cardID`,
					method: 'DELETE',
					body: { boardID, id },
				};
			},
		}),
	}),
});

export const {
	useCreateBoardMutation,
	useUpdateBoardMutation,
	useDeleteBoardMutation,
	useGetBoardQuery,
	useGetBoardsQuery,
	useCreateCardMutation,
	useUpdateCardMutation,
	useDeleteCardMutation,
} = boardsApi;
export { boardsApi };
