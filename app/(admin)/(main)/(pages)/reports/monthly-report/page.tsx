'use client';

import { DatePicker, Table, TableProps } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import React from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/ui/index';

import { mountObj } from '@/settings/report';

import { Order } from '@/types/index';

import { calcTotalPrice } from '@/utils/calc-total-price';

interface DataType {
	key: number;
	orderId: string;
	date: string;
	goodsCount: number;
	price: string;
}

const cols: TableProps<DataType>['columns'] = [
	{
		title: '№',
		dataIndex: 'key',
		key: 'key'
	},
	{
		title: 'Номер заказа',
		dataIndex: 'orderId',
		key: 'orderId'
	},
	{
		title: 'Дата заказа',
		dataIndex: 'date',
		key: 'date'
	},
	{
		title: 'Кол-во позиций',
		dataIndex: 'goodsCount',
		key: 'goodsCount'
	},
	{
		title: 'Сумма заказа',
		dataIndex: 'price',
		key: 'price'
	}
];

export default function MouthlyReportPage() {
	const [mount, setMountDate] = React.useState<number | null>(null);
	const [year, setYearDate] = React.useState<number | null>(null);
	const [orders, setOrders] = React.useState<DataType[] | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);

	const handleChangePiker = (arg: any) => {
		setMountDate(new Date(arg.$d).getMonth());
		setYearDate(new Date(arg.$d).getFullYear());
	};

	const handleClick = async () => {
		setIsLoading(true);

		await axios
			.post<Order[]>('/api/reports/mountly-report', { mount, year })
			.then((response) => {
				if (response.data.length) {
					const data: DataType[] = response.data.map((item, i) => {
						setTotalPrice(
							(state) => state + Number(calcTotalPrice(item.products))
						);

						return {
							key: i + 1,
							date: `${moment(item.createdAt).format('L')} ${moment(item.createdAt).format('LT')}`,
							goodsCount: item.products.length,
							orderId: `№${item.id}`,
							price: `${calcTotalPrice(item.products)} ₽`
						};
					});
					setOrders(data);
					toast.success('Ежемесячный отчет сформирован');
				} else {
					setOrders(null);
					toast.success('За данный период нет данных');
				}
			})
			.catch(() => toast.error('Неудалось фвормировать отчет'))
			.finally(() => setIsLoading(false));
	};

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Ежемесячный отчет</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Отчеты - Ежемесячный отчет
					</span>
				</div>
			</div>
			<div className="py-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<DatePicker picker="month" onChange={handleChangePiker} />
					<p className="text-sm text-zinc-400">
						Выберите период для формирования отчета
					</p>
				</div>
				<div>
					{orders ? (
						<div>
							<Table
								className="pb-2"
								columns={cols}
								dataSource={orders}
								pagination={false}
								bordered
							/>
							<span className="flex gap-2 justify-between pt-2 border-t-[1px] border-zinc-300">
								<p>Выручка за {mountObj[mount! + 1].toLocaleLowerCase()}:</p>
								<span className="flex-1 border-b-[1px] border-dashed border-zinc-300 mb-1" />
								<span>{totalPrice} ₽</span>
							</span>
						</div>
					) : (
						<div className="border-[1px] border-zinc-300 rounded h-[140px] flex items-center justify-center">
							<p className="text-sm text-zinc-400">
								Выберите период и нажмите кнопку «Сформировать отчет»
							</p>
						</div>
					)}
				</div>
				<div className="flex justify-end">
					<Button
						disabled={mount ? false : true}
						onClick={handleClick}
						isLoading={isLoading}
					>
						Сформировать отчет
					</Button>
				</div>
			</div>
		</div>
	);
}
