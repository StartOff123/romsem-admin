'use client';

import React from 'react';

import Clock from '@/components/clock';
import Container from '@/components/container';
import OrdersCount from '@/components/pages/dashboard/orders-count';

import { useAppSelector } from '@/hooks/redux-hooks';

import { timeOfDay } from '@/settings/dashboard';

import { getTimeOfDay } from '@/utils/get-time-of-day';

export default function Admin() {
	document.title = 'Рабочий стол | RomSem CRM';

	const { profile } = useAppSelector((state) => state.profileSlice);

	return (
		<div>
			<Container>
				<div className="space-y-4">
					<div className="py-2 border-b-[1px] border-zinc-300">
						<h1 className="text-xl leading-7 font-semibold">
							{`${timeOfDay[getTimeOfDay()!].greetings}, ${profile?.firstName}!`}
						</h1>
						<span className="text-xs leading-5 text-zinc-500">Главная</span>
					</div>
					<div>
						<Clock />
						<OrdersCount />
					</div>
				</div>
			</Container>
		</div>
	);
}
