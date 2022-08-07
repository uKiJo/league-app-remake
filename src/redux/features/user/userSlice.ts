import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';

export interface UserProps {
  email: string | null;
  uid: string;
}

export interface UserState {
  currentUser: UserProps | null;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    setUser: (state, action: PayloadAction<UserProps | null>) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    fetchUserFail: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchUserStart, setUser, fetchUserFail } = userSlice.actions;

export default userSlice.reducer;
