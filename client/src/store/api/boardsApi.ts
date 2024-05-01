import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.API_URL;

const boardsApi = createApi({
	reducerPath: 'boards',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
	tagTypes: ['Board'],
	endpoints: (builder) => ({
		createBoard: builder.mutation({
			query: ({ title }) => {
				return {
					url: `/api/boards`,
					method: 'POST',
					body: { title },
				};
			},
		}),

		updateBoard: builder.mutation({
			query: ({ id, title }) => {
				return {
					url: `/api/boards/${id}`,
					method: 'PATCH',
					body: { id, title },
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
			providesTags: [{ type: 'Board' }],
		}),

		createColumn: builder.mutation({
			query: ({ boardID, title, order }) => {
				return {
					url: `/api/boards/${boardID}/columns`,
					method: 'POST',
					body: { boardID, title, order },
				};
			},
			invalidatesTags: [{ type: 'Board' }],
		}),

		updateColumn: builder.mutation({
			query: ({ boardID, id, title, order }) => {
				return {
					url: `/api/boards/${boardID}/columns/${id}`,
					method: 'PATCH',
					body: { boardID, id, title, order },
				};
			},
		}),

		deleteColumn: builder.mutation({
			query: ({ boardID, id }) => {
				return {
					url: `/api/boards/${boardID}/columns/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: [{ type: 'Board' }],
		}),

		createCard: builder.mutation({
			query: ({ boardID, columnID, title, description, order }) => {
				return {
					url: `/api/boards/${boardID}/columns/${columnID}/cards`,
					method: 'POST',
					body: { boardID, columnID, title, description, order },
				};
			},
			invalidatesTags: [{ type: 'Board' }],
		}),

		updateCard: builder.mutation({
			query: ({ boardID, columnID, id, title, description, order }) => {
				return {
					url: `/api/boards/${boardID}/columns/${columnID}/cards/${id}`,
					method: 'PATCH',
					body: { boardID, columnID, id, title, description, order },
				};
			},
			invalidatesTags: [{ type: 'Board' }],
		}),

		deleteCard: builder.mutation({
			query: ({ boardID, columnID, id }) => {
				return {
					url: `/api/boards/${boardID}/columns/${columnID}/cards/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: [{ type: 'Board' }],
		}),

		changeCardColumn: builder.mutation({
			query: ({ id, boardID, columnID, newColumnID, order }) => {
				return {
					url: `/api/boards/${boardID}/columns/${columnID}/cards/${id}`,
					method: 'POST',
					body: {
						boardID,
						columnID,
						order,
						id,
						newColumnID,
					},
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
	useCreateColumnMutation,
	useUpdateColumnMutation,
	useDeleteColumnMutation,
	useCreateCardMutation,
	useUpdateCardMutation,
	useDeleteCardMutation,
	useChangeCardColumnMutation,
} = boardsApi;
export { boardsApi };
