import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { ReduxUsersState, User, UserFilters } from '@/types/index';

export const fetchAllUsers = createAsyncThunk(
	'profile/fetchAllUser',
	async () => {
		try {
			const { data } = await axios.get('/api/users/get-all');

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

export const fetchFiltersUsers = createAsyncThunk(
	'goods/fetchFiltersUsers',
	async (filters: UserFilters) => {
		try {
			const { data } = await axios.get(
				`/api/users/filters?role=${filters.role}&search=${filters.searchValue}`
			);

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

const initialState = {
	users: null,
	loading: 'pending'
} as ReduxUsersState;

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUser: (state, action: PayloadAction<User>) => {
			if (state.users) state.users = [...state.users, action.payload];
		},
		removeUser: (state, action: PayloadAction<string>) => {
			if (state.users) {
				const currentUser = state.users.filter(
					(user) => user.id === action.payload
				)[0];
				currentUser.status = 'FIRED';
				currentUser.deletedAt = new Date().toISOString();
				state.users = [
					...state.users.filter((user) => user.id !== action.payload),
					currentUser
				];
			}
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAllUsers.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchAllUsers.fulfilled,
			(state, action: PayloadAction<User[]>) => {
				state.users = action.payload;
				state.loading = 'succeeded';
			}
		);
		builder.addCase(fetchAllUsers.rejected, (state) => {
			state.users = null;
			state.loading = 'failed';
		});
		builder.addCase(fetchFiltersUsers.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchFiltersUsers.fulfilled,
			(state, action: PayloadAction<User[]>) => {
				state.users = action.payload;
				state.loading = 'succeeded';
			}
		);
		builder.addCase(fetchFiltersUsers.rejected, (state) => {
			state.users = null;
			state.loading = 'failed';
		});
	}
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
