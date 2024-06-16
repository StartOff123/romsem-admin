'use client';

import React from 'react';

import OrderCart from '@/components/order-cart';

import { Empty } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchOrdersWithStatus } from '@/lib/redux/slices/order-slice';

export default function DeliveredPage() {
	document.title = 'Заказы в доставке | RomSem CRM';

	const dispatch = useAppDispatch();

	const { profile } = useAppSelector((state) => state.profileSlice);
	const { orders, ordersWithStatus, loading } = useAppSelector(
		(state) => state.ordersSlice
	);

	React.useEffect(() => {
		dispatch(fetchOrdersWithStatus('DELIVERED'));
	}, [dispatch]);

	return (
		<div className="flex flex-col gap-4">
			{loading === 'pending' ? (
				<div className="flex items-center gap-4">
					<span className="w-12 h-4 rounded bg-zinc-200 animate-pulse" />
					<span className="w-12 h-4 rounded bg-zinc-200 animate-pulse" />
				</div>
			) : (
				<div className="flex items-center gap-4 text-zinc-400 text-sm">
					<p>Всего заказов: {orders?.length}</p>
					<p>Из них в доставке: {ordersWithStatus?.length}</p>
				</div>
			)}
			{ordersWithStatus?.length && loading === 'succeeded' ? (
				<div className="grid grid-cols-2 gap-2">
					{ordersWithStatus.map((order) => (
						<OrderCart
							key={order.id}
							item={order}
							btnText="Закрыть заказ"
							actionStatus="ISSUED"
							currentStatus="DELIVERED"
							isFullAccess={
								profile?.role === 'COURIER' || profile?.role === 'ADMIN'
									? true
									: false
							}
						/>
					))}
				</div>
			) : null}
			{!ordersWithStatus?.length && loading === 'succeeded' && (
				<Empty text="Нет заказов в доставке" />
			)}
			{loading === 'pending' && (
				<div className="grid grid-cols-2 gap-2">
					{Array(8)
						.fill(1)
						.map((_, i) => (
							<div
								key={i}
								className="h-[182px] bg-zinc-200 rounded animate-pulse"
							></div>
						))}
				</div>
			)}
		</div>
	);
}
