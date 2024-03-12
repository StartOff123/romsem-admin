import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ReduxSelectUsersState, User } from '@/types/index';

export const fetchUser = createAsyncThunk(
	'profile/fetchUser',
	async ({ id }: { id: string }) => {
		try {
			const { data } = await axios.get(`/api/users/get-one/${id}`);

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

const initialState = {
	selectUser: null,
	loading: 'pending'
} as ReduxSelectUsersState;

export const selectUserSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUser.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchUser.fulfilled,
			(state, action: PayloadAction<User>) => {
				state.selectUser = action.payload;
				state.loading = 'succeeded';
			}
		);
		builder.addCase(fetchUser.rejected, (state) => {
			state.selectUser = null;
			state.loading = 'failed';
		});
	}
});

export default selectUserSlice.reducer;
