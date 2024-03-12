import { configureStore } from '@reduxjs/toolkit';

import goodsSlice from '@/redux/slices/goods-slice';
import ordersSlice from '@/redux/slices/order-slice';
import profileSlice from '@/redux/slices/profile-slice';
import selectUserSlice from '@/redux/slices/select-user-slice';
import usersSlice from '@/redux/slices/users-slice';

export const store = configureStore({
	reducer: {
		profileSlice,
		goodsSlice,
		usersSlice,
		selectUserSlice,
		ordersSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
