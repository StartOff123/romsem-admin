import { OrderStatus } from '@prisma/client';
import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import toast from 'react-hot-toast';
import { CgDetailsLess } from 'react-icons/cg';

import { Button, OrderString } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import {
	fetchOrdersWithStatus,
	fetchSetStatus
} from '@/lib/redux/slices/order-slice';

import { Order } from '@/types/index';

import { calcTotalPrice } from '@/utils/calc-total-price';
import { numberWithSpaces } from '@/utils/number-with-spaces';

type OrderCartProps = {
	item: Order;
	isClosed?: boolean;
	actionStatus: OrderStatus;
	currentStatus: OrderStatus;
	btnText: string;
	isFullAccess: boolean;
};

const OrderCart = ({
	item,
	actionStatus,
	btnText,
	currentStatus,
	isClosed,
	isFullAccess
}: OrderCartProps) => {
	const { onOpen } = useModal();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleClick = async () => {
		setIsLoading(true);

		dispatch(fetchSetStatus({ id: item.id, status: actionStatus }))
			.then(() => {
				switch (actionStatus) {
					case 'GETTINGREADY':
						toast.success('Заказ был отправлен на готовку');
						break;
					case 'DELIVERED':
						toast.success('Заказ был отправлен в доставку');
						break;
					case 'ISSUED':
						toast.success('Заказ был закрыт');
						break;
				}
			})
			.catch(() => toast.error('Неудалось обработать заказ'))
			.finally(() => {
				dispatch(fetchOrdersWithStatus(currentStatus));
				setIsLoading(false);
			});
	};

	return (
		<div className="border-[1px] border-zinc-300 rounded overflow-hidden">
			<div className="flex items-center justify-between bg-[#202B46] p-2">
				<div className="flex items-center gap-2">
					<h1 className="text-sm text-white">Заказ №{item.id}</h1>
					<OrderString orderStatus={item.status} />
				</div>
				<p className="text-xs text-zinc-400">
					от {moment(item.createdAt).format('L')}{' '}
					{moment(item.createdAt).format('LT')}
				</p>
			</div>
			<div className="p-2 flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<span className="flex text-sm gap-2">
						<p>Заказчик</p>
						<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
						<p>{item.name}</p>
					</span>
					<span className="flex text-sm gap-2">
						<p>Номер телефона</p>
						<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
						<p>{item.phone}</p>
					</span>
					<span className="flex text-sm gap-2">
						<p>Сумма заказа</p>
						<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
						<p>{numberWithSpaces(calcTotalPrice(item.products))} ₽</p>
					</span>
				</div>
				<div className="flex items-center justify-between">
					{!isClosed && isFullAccess && (
						<Button isLoading={isLoading} onClick={handleClick}>
							{btnText}
						</Button>
					)}
					<button
						className="flex items-center text-zinc-400 hover:text-sky-500 transition-colors text-sm gap-2"
						onClick={() => onOpen('view-order', { orderData: item })}
					>
						<p>Подробнее</p>
						<CgDetailsLess />
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrderCart;
