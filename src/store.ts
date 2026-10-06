import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { api } from "./RTKquery/api";
import { optimisticInvalidationUsersApi } from "./optimisticInvalidation/api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [api.reducerPath]: api.reducer,
    [optimisticInvalidationUsersApi.reducerPath]: optimisticInvalidationUsersApi.reducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, optimisticInvalidationUsersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;