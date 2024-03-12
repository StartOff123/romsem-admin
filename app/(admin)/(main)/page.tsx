'use client';

import React from 'react';

import Container from '@/components/container';
import OrdersCount from '@/components/pages/dashboard/orders-count';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function Admin() {
	const { profile } = useAppSelector((state) => state.profileSlice);

	return (
		<div>
			<Container>
				<div>
					<div className="py-2 border-b-[1px] border-zinc-300">
						<h1 className="text-xl leading-7 font-semibold">
							Добрый день, {profile?.firstName}!
						</h1>
						<span className="text-xs leading-5 text-zinc-500">Главная</span>
					</div>
					<div>
						<OrdersCount />
					</div>
				</div>
			</Container>
		</div>
	);
}
