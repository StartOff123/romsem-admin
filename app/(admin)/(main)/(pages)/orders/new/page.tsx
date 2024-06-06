'use client';

import OrderCart from '@/components/order-cart';

import { Empty } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function NewPage() {
	document.title = 'Новые заказы | RomSem CRM';

	const { profile } = useAppSelector((state) => state.profileSlice);
	const { orders, loading } = useAppSelector((state) => state.ordersSlice);
	const newOrders = orders?.filter((order) => order.status === 'PROCESSING');

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
					<p>Из них новые: {newOrders?.length}</p>
				</div>
			)}
			{newOrders?.length && loading === 'succeeded' ? (
				<div className="grid grid-cols-2 gap-2">
					{newOrders.map((order) => (
						<OrderCart
							key={order.id}
							item={order}
							btnText="Отправить на готовку"
							actionStatus="GETTINGREADY"
							isFullAccess={
								profile?.role === 'MENEGER' || profile?.role === 'ADMIN'
									? true
									: false
							}
						/>
					))}
				</div>
			) : null}
			{!newOrders?.length && loading === 'succeeded' && (
				<Empty text="Нет новых заказов" />
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
