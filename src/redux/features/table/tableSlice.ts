import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Team {
  name: string;
  points?: number;
}

interface Table {
  table: Team[];
}

const initialState: Table = {
  table: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<Team[]>) => {
      state.table = action.payload;
    },
  },
});

export const { setTable } = tableSlice.actions;

export default tableSlice.reducer;
