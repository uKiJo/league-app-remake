import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice';
import fixtureReducer from './features/fixture/fixtureSlice';
import teamsReducer from './features/teams/teamsSlice';
import tableReducer from './features/table/tableSlice';
import { leagueApi } from '../services/leagueApi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    table: tableReducer,
    [leagueApi.reducerPath]: leagueApi.reducer,
    fixture: fixtureReducer,
    teams: teamsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(leagueApi.middleware),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, ///////////
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
