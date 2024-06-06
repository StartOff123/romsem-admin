'use client';

import { DatePicker, Table, TableProps } from 'antd';
import axios from 'axios';
import 'moment/locale/ru';
import React from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/ui/index';

import { mountObj } from '@/settings/report';

import { Order } from '@/types/index';
import Link from 'next/link';
import { LuPrinter } from 'react-icons/lu';

export interface DataType {
	key: number;
	mount: string;
	orderCount: number;
}

const cols: TableProps<DataType>['columns'] = [
	{
		title: '№',
		dataIndex: 'key',
		key: 'key'
	},
	{
		title: 'Месяц',
		dataIndex: 'mount',
		key: 'mount'
	},
	{
		title: 'Кол-во заказов',
		dataIndex: 'orderCount',
		key: 'orderCount'
	}
];

export default function PerfomanceReportPage() {
	document.title = 'Отчет эффективности | RomSem CRM';

	const [year, setYearDate] = React.useState<number | null>(null);
	const [reportData, setReportData] = React.useState<DataType[] | null>(null);
	const [orders, setOrders] = React.useState<Order[] | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleChangePiker = (arg: any) => {
		setYearDate(arg.$y);
	};

	const handleClick = async () => {
		setIsLoading(true);

		await axios
			.post<Order[]>('/api/reports/perfomance-report', { date: year })
			.then((response) => {
				if (response.data.length) {
					const data: DataType[] = Object.entries(mountObj).map((item) => {
						return {
							key: Number(item[0]),
							mount: item[1],
							orderCount: response.data.filter(
								(order) =>
									order.createdAt >
										`${year}-${Number(item[0]) < 10 ? `0${item[0]}` : item[0]}-01T19:00:00.000+00:00` &&
									order.createdAt <
										`${year}-${Number(item[0]) < 10 ? `0${item[0]}` : item[0]}-31T19:00:00.000+00:00`
							).length
						};
					});

					setReportData(data);
					setOrders(response.data);
					toast.success('Отчет эффективности сформирован');
				} else {
					setReportData(null);
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
					<h1 className="text-xl leading-7 font-semibold">
						Отчет эффективности
					</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Отчеты - Отчет эффективности
					</span>
				</div>
			</div>
			<div className="py-4 flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<DatePicker picker="year" onChange={handleChangePiker} />
					<p className="text-sm text-zinc-400">
						Выберите период для формирования отчета
					</p>
				</div>
				<div>
					{reportData ? (
						<div>
							<Table
								className="pb-2"
								columns={cols}
								dataSource={reportData}
								pagination={false}
								bordered
							/>
							<span className="flex gap-2 justify-between pt-2 border-t-[1px] border-zinc-300">
								<p>Всего заказов за {year} год:</p>
								<span className="flex-1 border-b-[1px] border-dashed border-zinc-300 mb-1" />
								<span>{orders?.length}</span>
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
				<div className="flex justify-end items-center gap-2">
					{reportData && (
						<Link
							href={`/print/report/performance-report/${year}`}
							target="_blank"
							className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-500 py-2 px-3 rounded text-sm transition min-w-[80px]"
						>
							<p>Печать</p>
							<LuPrinter />
						</Link>
					)}
					<Button
						disabled={year ? false : true}
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
