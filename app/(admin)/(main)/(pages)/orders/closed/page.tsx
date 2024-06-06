'use client';

import OrderCart from '@/components/order-cart';

import { Empty } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function ClosedPage() {
	document.title = 'Закрытые заказы | RomSem CRM';

	const { orders, loading } = useAppSelector((state) => state.ordersSlice);
	const closedOrder = orders?.filter((order) => order.status === 'ISSUED');

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
					<p>Из них закрыты: {closedOrder?.length}</p>
				</div>
			)}
			{closedOrder?.length && loading === 'succeeded' ? (
				<div className="grid grid-cols-2 gap-2">
					{closedOrder.map((order) => (
						<OrderCart
							key={order.id}
							item={order}
							isClosed
							btnText="Закрыть заказ"
							actionStatus="ISSUED"
							isFullAccess={false}
						/>
					))}
				</div>
			) : null}
			{!closedOrder?.length && loading === 'succeeded' && (
				<Empty text="Нет закрытых заказов" />
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
