import axios from 'axios';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Order } from '@/types/index';

import { calcTotalPrice } from '@/utils/calc-total-price';

const OrdersCount = () => {
	const [orders, setOrders] = React.useState<number | null>(null);
	const [income, setIncome] = React.useState<number | null>(null);

	const getOrdersCount = async () => {
		const response = (await axios.get('/api/dashboard/orders')) as {
			data: Order[];
		};

		setOrders(response.data.length);
		setIncome(0);
		response.data.forEach((order) => {
			setIncome((state) => state! + calcTotalPrice(order.products));
		});
	};

	React.useEffect(() => {
		getOrdersCount();
	}, []);

	return (
		<div className="grid grid-cols-2 gap-8 py-8 h-[200px]">
			<div className="bg-blue-400 rounded-lg py-4 px-6 h-[200px]">
				{typeof orders === 'number' ? (
					<span className="text-3xl text-white font-bold">{orders}</span>
				) : (
					<AiOutlineLoading3Quarters
						className="animate-spin text-white"
						size={30}
					/>
				)}
				<p className="text-white opacity-70 text-sm">
					Заказ(-a/-ов) за сегодня
				</p>
			</div>
			<div className="h-[200px]">
				{typeof orders === 'number' ? (
					<div className="flex items-start gap-1">
						<span className="text-xl text-zinc-400">₽</span>
						<span className="text-3xl font-bold">{income},00</span>
					</div>
				) : (
					<AiOutlineLoading3Quarters className="animate-spin" size={30} />
				)}
				<p className="text-zinc-400 text-sm">Доходы за сегодня</p>
			</div>
		</div>
	);
};

export default OrdersCount;
