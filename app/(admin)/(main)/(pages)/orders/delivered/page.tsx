'use client';

import OrderCart from '@/components/order-cart';

import { Empty } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function DeliveredPage() {
	document.title = 'Заказы в доставке | RomSem CRM';

	const { profile } = useAppSelector((state) => state.profileSlice);
	const { orders, loading } = useAppSelector((state) => state.ordersSlice);
	const deliveredOrder = orders?.filter(
		(order) => order.status === 'DELIVERED'
	);

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
					<p>Из них в доставке: {deliveredOrder?.length}</p>
				</div>
			)}
			{deliveredOrder?.length && loading === 'succeeded' ? (
				<div className="grid grid-cols-2 gap-2">
					{deliveredOrder.map((order) => (
						<OrderCart
							key={order.id}
							item={order}
							btnText="Закрыть заказ"
							actionStatus="ISSUED"
							isFullAccess={
								profile?.role === 'COURIER' || profile?.role === 'ADMIN'
									? true
									: false
							}
						/>
					))}
				</div>
			) : null}
			{!deliveredOrder?.length && loading === 'succeeded' && (
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
