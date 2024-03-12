import { OrderStatus } from '@prisma/client';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Order, ReduxOrderState } from '@/types/index';

export const fetchAllOrders = createAsyncThunk(
	'orders/fetchAllOrders',
	async () => {
		try {
			const { data } = await axios.get('/api/orders/get-all');

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

export const fetchSetStatus = createAsyncThunk(
	'orders/fetchSetStatus',
	async ({ id, status }: { status: OrderStatus; id: string | number }) => {
		try {
			const { data } = await axios.patch(`/api/orders/set-status/${id}`, {
				status
			});

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

const initialState = {
	orders: null,
	loading: 'pending'
} as ReduxOrderState;

export const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		updateOrders: (state, action: PayloadAction<Order>) => {
			if (state.orders) {
				const arr = state.orders?.filter(
					(item) => item.id !== action.payload.id
				);
				state.orders = [...arr, action.payload];
			}
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAllOrders.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchAllOrders.fulfilled,
			(state, action: PayloadAction<Order[]>) => {
				state.orders = action.payload;
				state.loading = 'succeeded';
			}
		);
		builder.addCase(fetchAllOrders.rejected, (state) => {
			state.orders = null;
			state.loading = 'failed';
		});
	}
});

export const { updateOrders } = orderSlice.actions;
export default orderSlice.reducer;
