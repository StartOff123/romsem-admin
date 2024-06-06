'use client';

import { DatePicker, Table, TableProps } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { LuPrinter } from 'react-icons/lu';

import { Button } from '@/ui/index';

import { mountObj } from '@/settings/report';

import { Order } from '@/types/index';

import { calcTotalPrice } from '@/utils/calc-total-price';
import { numberWithSpaces } from '@/utils/number-with-spaces';

export interface DataType {
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
	document.title = 'Ежемесячный отчет | RomSem CRM';

	const [mount, setMountDate] = React.useState<number | null>(null);
	const [year, setYearDate] = React.useState<number | null>(null);
	const [orders, setOrders] = React.useState<DataType[] | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);

	const handleChangePiker = (arg: any) => {
		if (!arg) {
			setMountDate(null);
			setYearDate(null);
			return;
		}

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
							price: `${numberWithSpaces(calcTotalPrice(item.products))} ₽`
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
								<span>{numberWithSpaces(totalPrice)} ₽</span>
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
				<div className='flex justify-end items-center gap-2'>
					{orders && (
						<Link
							href={`/print/report/mouthly-report/${year}/${mount}`}
							target="_blank"
							className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-500 py-2 px-3 rounded text-sm transition min-w-[80px]"
						>
							<p>Печать</p>
							<LuPrinter />
						</Link>
					)}
					<div className="flex justify-end">
						<Button
							disabled={typeof mount === 'number' ? false : true}
							onClick={handleClick}
							isLoading={isLoading}
						>
							Сформировать отчет
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
