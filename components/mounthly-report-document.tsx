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
import moment from 'moment';
import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

import { DataType } from '@/app/(admin)/(main)/(pages)/reports/monthly-report/page';

import { countDaysInMountObj, mountObj } from '@/settings/report';

import { calcTotalPrice } from '@/utils/calc-total-price';
import { numberWithSpaces } from '@/utils/number-with-spaces';

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

const MounthlyReportDocument: React.FC<{
	orders: DataType[];
	totalPrice: number;
	mount: number;
	year: number;
}> = ({ orders, totalPrice, mount, year }) => {
	return (
		<Document
			title={`Ежемесячный отчет за ${mountObj[mount! + 1].toLocaleLowerCase()}`}
		>
			<Page style={styles.body} size="A4" orientation="landscape">
				<View style={{ flex: 1 }}>
					<View style={{ textAlign: 'center' }}>
						<Text>Отчет</Text>
						<Text style={{ fontSize: 12 }}>
							о выполненых заказах за период активного месяца
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
								{`от 01.${mount + 1 < 10 ? `0${mount + 1}` : mount + 1}.${year} г. по ${countDaysInMountObj[mount + 1]}.${mount + 1 < 10 ? `0${mount + 1}` : mount + 1}.${year} г.`}
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
									width: '20%'
								}}
							>
								Номер заказа
							</Text>
							<Text
								style={{
									width: '30%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000'
								}}
							>
								Дата заказа
							</Text>
							<Text
								style={{
									width: '20%'
								}}
							>
								Кол-во позиций
							</Text>
							<Text
								style={{
									width: '20%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000'
								}}
							>
								Сумма заказа руб.
							</Text>
						</View>
						{orders.map((order) => (
							<View
								key={order.key}
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
									{order.key}
								</Text>
								<Text
									style={{
										width: '20%'
									}}
								>
									{order.orderId}
								</Text>
								<Text
									style={{
										width: '30%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000'
									}}
								>
									{order.date}
								</Text>
								<Text
									style={{
										width: '20%'
									}}
								>
									{order.goodsCount}
								</Text>
								<Text
									style={{
										width: '20%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000'
									}}
								>
									{order.price}
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
									width: '80%',
									borderLeft: '1px solid #000',
									paddingLeft: 5
								}}
							>
								Итого
							</Text>
							<Text
								style={{
									width: '20%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000',
									textAlign: 'center'
								}}
							>
								{numberWithSpaces(totalPrice)}
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

const PDFViewMounthlyReport: React.FC<{ year: number; mount: number }> = ({
	mount,
	year
}) => {
	document.title = `Ежемесячный отчет за ${mountObj[mount + 1].toLowerCase()}`;

	const [orders, setOrders] = React.useState<DataType[] | null>(null);
	const [totalPrice, setTotalPrice] = React.useState<number>(0);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);

	const fetchReport = () => {
		axios
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
							price: `${numberWithSpaces(calcTotalPrice(item.products))}`
						};
					});
					setOrders(data);
				} else {
					setOrders(null);
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
			) : orders ? (
				<PDFViewer showToolbar height="100%" width="100%">
					<MounthlyReportDocument
						orders={orders}
						totalPrice={totalPrice}
						mount={mount}
						year={year}
					/>
				</PDFViewer>
			) : null}
		</>
	);
};

export default PDFViewMounthlyReport;
