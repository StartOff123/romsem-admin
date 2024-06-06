import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ReduxProfileState, User } from '@/types/index';

export const fetchCurrentUser = createAsyncThunk(
	'profile/fetchCurrentUser',
	async () => {
		try {
			const { data } = await axios.get('/api/profile/get-me');

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

const initialState = {
	profile: null,
	loading: 'pending'
} as ReduxProfileState;

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		editProfile: (state, action: PayloadAction<User>) => {
			if (state.profile) state.profile = action.payload;
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchCurrentUser.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchCurrentUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.profile = action.payload;
				state.loading = 'succeeded';
			}
		);
		builder.addCase(fetchCurrentUser.rejected, (state) => {
			state.profile = null;
			state.loading = 'failed';
		});
	}
});

export const isAuth = (state: ReduxProfileState) => Boolean(state.profile);
export const { editProfile } = profileSlice.actions;
export default profileSlice.reducer;
