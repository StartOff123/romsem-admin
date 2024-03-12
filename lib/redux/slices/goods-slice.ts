import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { Product, ProductFilters, ReduxProductState } from '@/types/index';

export const fetchAllGoods = createAsyncThunk(
	'goods/fetchAllGoods',
	async () => {
		try {
			const { data } = await axios.get('/api/goods/get-all');

			return data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				throw error.response.data;
			}
		}
	}
);

export const fetchFiltersGoods = createAsyncThunk(
	'goods/fetchFiltersGoods',
	async (filters: ProductFilters) => {
		try {
			const { data } = await axios.get(
				`/api/goods/filters?sort=${filters.sort}&type=${filters.productType}&search=${filters.searchValue}`
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
	goods: null,
	loading: 'pending',
	isFilters: false
} as ReduxProductState;

export const goodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			if (state.goods) state.goods = [...state.goods, action.payload];
		},
		removeProduct: (state, action: PayloadAction<string>) => {
			if (state.goods)
				state.goods = state.goods.filter((item) => item.id !== action.payload);
		},
		updateProduct: (state, action: PayloadAction<Product>) => {
			if (state.goods) {
				const arr = state.goods?.filter(
					(item) => item.id !== action.payload.id
				);
				state.goods = [...arr, action.payload];
			}
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchAllGoods.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchAllGoods.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.goods = action.payload;
				state.loading = 'succeeded';
				state.isFilters = false;
			}
		);
		builder.addCase(fetchAllGoods.rejected, (state) => {
			state.goods = null;
			state.loading = 'failed';
		});
		builder.addCase(fetchFiltersGoods.pending, (state) => {
			state.loading = 'pending';
		});
		builder.addCase(
			fetchFiltersGoods.fulfilled,
			(state, action: PayloadAction<Product[]>) => {
				state.goods = action.payload;
				state.loading = 'succeeded';
				state.isFilters = true;
			}
		);
		builder.addCase(fetchFiltersGoods.rejected, (state) => {
			state.goods = null;
			state.loading = 'failed';
		});
	}
});

export const { addProduct, removeProduct, updateProduct } = goodsSlice.actions;
export default goodsSlice.reducer;
