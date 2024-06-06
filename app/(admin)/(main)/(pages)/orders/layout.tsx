'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { AddButton } from '@/components/ui';

import Tabs, { TabsItem } from '@/ui/tabs';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchAllOrders } from '@/lib/redux/slices/order-slice';

export default function OrdersLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const [pageNum, setPageNum] = React.useState<number | undefined>(undefined);
	const { profile } = useAppSelector((state) => state.profileSlice);

	const tabsItems: TabsItem[] = [
		{
			key: 1,
			label: 'Новые',
			children,
			onClick: () => router.push('/orders/new')
		},
		{
			key: 2,
			label: 'На готовке',
			children,
			onClick: () => router.push('/orders/getting-ready')
		},
		{
			key: 3,
			label: 'Доставляются',
			children,
			onClick: () => router.push('/orders/delivered')
		},
		{
			key: 4,
			label: 'Закрытые',
			children,
			onClick: () => router.push('/orders/closed')
		}
	];

	React.useEffect(() => {
		switch (pathname) {
			case '/orders/new':
				setPageNum(1);
				break;
			case '/orders/getting-ready':
				setPageNum(2);
				break;
			case '/orders/delivered':
				setPageNum(3);
				break;
			case '/orders/closed':
				setPageNum(4);
				break;
			default:
				setPageNum(undefined);
		}
	}, [pathname]);

	React.useEffect(() => {
		dispatch(fetchAllOrders());
	}, []);

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Заказы</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Заказы
					</span>
				</div>
				{(profile?.role === 'ADMIN' || profile?.role === 'MENEGER') && (
					<div>
						<AddButton onClick={() => router.push('/add-order')} />
					</div>
				)}
			</div>
			<div className="py-4">
				<Tabs items={tabsItems} defaultActiveKey={pageNum} />
			</div>
		</div>
	);
}
