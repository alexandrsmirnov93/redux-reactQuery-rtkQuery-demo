import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
}

export const optimisticInvalidationUsersApi = createApi({
  reducerPath: 'optimisticInvalidationUsersApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  tagTypes: ['Users'],

  endpoints: (builder) => ({
    // GET /users
    getUsers: builder.query<User[], void>({
      query: () => '/users',

      // Говорим RTK Query:
      // результат этого запроса относится к Users
      providesTags: ['Users'],
    }),

    // PUT /users/:id
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: user,
      }),

      async onQueryStarted(
        user,
        { dispatch, queryFulfilled }
      ) {
        // OPTIMISTIC UPDATE
        const patchResult = dispatch(
          optimisticInvalidationUsersApi.util.updateQueryData(
            'getUsers',
            undefined,
            (draft) => {
              const existingUser = draft.find(
                (item) => item.id === user.id
              );

              if (existingUser) {
                existingUser.name = user.name;
              }
            }
          )
        );

        try {
          // Ждём ответа сервера
          await queryFulfilled;
        } catch {
          // Если сервер вернул ошибку —
          // откатываем изменение
          patchResult.undo();
        }
      },

      // INVALIDATION
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
} = optimisticInvalidationUsersApi;