import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Team {
  name: string;
}

interface Table {
  teams: Team[];
}

const initialState: Table = {
  teams: [],
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    storeTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
  },
});

export const { storeTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
