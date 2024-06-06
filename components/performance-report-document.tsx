import {
	Document,
	Font,
	PDFViewer,
	Page,
	StyleSheet,
	Text,
	View
} from '@react-pdf/renderer';
import axios from 'axios';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

import { DataType } from '@/app/(admin)/(main)/(pages)/reports/performance-report/page';

import { mountObj } from '@/settings/report';

import { Order } from '../types';

Font.register({
	family: 'Roboto',
	src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
	body: {
		padding: 20,
		fontFamily: 'Roboto'
	}
});

const PerfomanceReportDocument: React.FC<{
	orders: Order[];
	reportData: DataType[];
	year: number;
}> = ({ orders, reportData, year }) => {
	return (
		<Document title={`Отчет эффективности за ${year} год`}>
			<Page style={styles.body} size="A5">
				<View style={{ flex: 1 }}>
					<View style={{ textAlign: 'center' }}>
						<Text>Отчет</Text>
						<Text style={{ fontSize: 12 }}>
							об эффективности работы организации
						</Text>
					</View>
					<View style={{ paddingTop: 20 }}>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Организация:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								ООО «RomSem»
							</Text>
						</View>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Отчетный период:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{`01.01.${year} г. по 31.12.${year} г.`}
							</Text>
						</View>
					</View>
					<View style={{ paddingTop: 15 }}>
						<View
							style={{
								flexDirection: 'row',
								fontSize: 12,
								textAlign: 'center',
								borderTop: '1px solid #000'
							}}
						>
							<Text
								style={{
									width: '10%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000'
								}}
							>
								№
							</Text>
							<Text
								style={{
									width: '45%'
								}}
							>
								Месяц
							</Text>
							<Text
								style={{
									width: '45%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000'
								}}
							>
								Выполнено заказов
							</Text>
						</View>
						{reportData.map((data) => (
							<View
								key={data.key}
								style={{
									flexDirection: 'row',
									fontSize: 12,
									textAlign: 'center',
									borderTop: '1px solid #000'
								}}
							>
								<Text
									style={{
										width: '10%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000'
									}}
								>
									{data.key}
								</Text>
								<Text
									style={{
										width: '45%'
									}}
								>
									{data.mount}
								</Text>
								<Text
									style={{
										width: '45%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000'
									}}
								>
									{data.orderCount}
								</Text>
							</View>
						))}
						<View
							style={{
								flexDirection: 'row',
								fontSize: 12,
								borderTop: '1px solid #000',
								borderBottom: '1px solid #000'
							}}
						>
							<Text
								style={{
									width: '55%',
									borderLeft: '1px solid #000',
									paddingLeft: 5
								}}
							>
								Итого
							</Text>
							<Text
								style={{
									width: '45%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000',
									textAlign: 'center'
								}}
							>
								{orders.length}
							</Text>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontSize: 12 }}>Подпить директора: </Text>
					<View style={{ borderBottom: '0.5px solid #000', width: 140 }}>
						{' '}
					</View>
				</View>
			</Page>
		</Document>
	);
};

const PDFViewPerfomanceReport: React.FC<{ year: number }> = ({ year }) => {
	document.title = `Отчет эффективности за ${year} год`;

	const [reportData, setReportData] = React.useState<DataType[] | null>(null);
	const [orders, setOrders] = React.useState<Order[] | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);

	const fetchReport = () => {
		axios
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
				} else {
					setReportData(null);
				}
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));
	};

	React.useEffect(() => {
		fetchReport();
	}, []);

	return (
		<>
			{error ? (
				<div className="relative w-full h-full flex justify-center items-center">
					<div className="flex flex-col gap-8 items-center">
						<div className="relative">
							<FaRegFilePdf size={60} className="text-zinc-500" />
							<span className="absolute -top-6 -right-4">
								<MdError size={50} className="text-red-500" />
							</span>
						</div>
						<h1 className="text-lg">Ошибка при загрузке файла PDF</h1>
					</div>
				</div>
			) : loading ? (
				<div className="relative w-full h-full flex justify-center items-center">
					<div className="flex flex-col gap-16 items-center">
						<div className="relative">
							<FaRegFilePdf size={60} className="text-zinc-500" />
							<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								<AiOutlineLoading3Quarters
									size={140}
									className="text-zinc-500 animate-spin"
								/>
							</span>
						</div>
						<h1 className="text-lg">Загрузка файла PDF...</h1>
					</div>
				</div>
			) : reportData && orders ? (
				<PDFViewer showToolbar height="100%" width="100%">
					<PerfomanceReportDocument
						orders={orders}
						reportData={reportData}
						year={year}
					/>
				</PDFViewer>
			) : null}
		</>
	);
};

export default PDFViewPerfomanceReport;
