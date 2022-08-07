import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Game {
  homeTeam: {
    name?: string;
  };
  awayTeam: {
    name?: string;
  };
  id: number;
}

interface FixtureState {
  fixture: Game[][];
}

const initialState: FixtureState = {
  fixture: [],
};

export const fixtureSlice = createSlice({
  name: 'fixture',
  initialState,
  reducers: {
    setFixture: (state, action: PayloadAction<Game[][]>) => {
      state.fixture = action.payload;
    },
  },
});

export const { setFixture } = fixtureSlice.actions;

export default fixtureSlice.reducer;
