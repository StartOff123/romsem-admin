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

import { calcTotalPrice } from '@/utils/calc-total-price';

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

const OrderDocument: React.FC<{ order: Order }> = ({ order }) => {
	return (
		<Document
			title={`Заказ №${order.id} от ${moment(order.createdAt).format('L')}`}
		>
			<Page style={styles.body} size="A5">
				<View style={{ flex: 1 }}>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Text style={{ fontSize: 12 }}>Организация: ООО «RomSem»</Text>
						<View style={{ fontSize: 12, flexDirection: 'row' }}>
							<Text>Дата: </Text>
							<View style={{ borderBottom: '0.5px solid #000' }}>
								<Text>{moment(order.createdAt).format('DD')}</Text>
							</View>
							<Text>.</Text>
							<View style={{ borderBottom: '0.5px solid #000' }}>
								<Text>{moment(order.createdAt).format('MM')}</Text>
							</View>
							<Text>.20</Text>
							<View style={{ borderBottom: '0.5px solid #000' }}>
								<Text>{moment(order.createdAt).format('YY')}</Text>
							</View>
							<Text> г.</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							paddingTop: 40,
							justifyContent: 'center'
						}}
					>
						<Text style={{ textAlign: 'center' }}>Заказ №</Text>
						<View style={{ borderBottom: '0.5px solid #000' }}>
							<Text> {order.id} </Text>
						</View>
					</View>
					<View style={{ paddingTop: 20 }}>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Клиент:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{order.name}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Номер телефона:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{order.phone}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Email:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{order.email ? order.email : ' '}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Адрес доставки:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{`г. Златоуст, ул. ${order.street}, д. ${order.house}`}
								{order.entrance && `, п. ${order.entrance}`}
								{order.apartment && `, кв. ${order.apartment}`}
							</Text>
						</View>
						<View style={{ flexDirection: 'row', width: '100%' }}>
							<Text style={{ fontSize: 12 }}>Комментарий:</Text>
							<Text
								style={{
									fontSize: 12,
									paddingLeft: 5,
									borderBottom: '0.5px solid #000',
									flex: 1
								}}
							>
								{order.comments ? order.comments : ' '}
							</Text>
						</View>
					</View>
					<View style={{ paddingTop: 15 }}>
						<Text style={{ fontSize: 12, paddingBottom: 5 }}>Товары:</Text>
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
									width: '70%'
								}}
							>
								Наименование
							</Text>
							<Text
								style={{
									width: '20%',
									borderLeft: '1px solid #000',
									borderRight: '1px solid #000'
								}}
							>
								Цена руб.
							</Text>
						</View>
						{order.products.map((product, i) => (
							<View
								key={product.id}
								style={{
									borderTop: '1px solid #000',
									flexDirection: 'row',
									fontSize: 12
								}}
							>
								<Text
									style={{
										width: '10%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000',
										paddingLeft: 5,
										textAlign: 'center'
									}}
								>
									{i + 1}
								</Text>
								<Text
									style={{
										width: '70%',
										paddingLeft: 5
									}}
								>
									{product.title}
								</Text>
								<Text
									style={{
										width: '20%',
										borderLeft: '1px solid #000',
										borderRight: '1px solid #000',
										paddingLeft: 5
									}}
								>
									{product.price}
								</Text>
							</View>
						))}
						{order.products.length <= 15 &&
							Array(15 - order.products.length)
								.fill(1)
								.map((_, i) => (
									<View
										key={i}
										style={{
											borderTop: '1px solid #000',
											flexDirection: 'row',
											fontSize: 12
										}}
									>
										<Text
											style={{
												width: '10%',
												borderLeft: '1px solid #000',
												borderRight: '1px solid #000',
												paddingLeft: 5
											}}
										>
											{' '}
										</Text>
										<Text
											style={{
												width: '70%',
												paddingLeft: 5
											}}
										>
											{' '}
										</Text>
										<Text
											style={{
												width: '20%',
												borderLeft: '1px solid #000',
												borderRight: '1px solid #000',
												paddingLeft: 5
											}}
										>
											{' '}
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
									paddingLeft: 5
								}}
							>
								{calcTotalPrice(order.products)}
							</Text>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ fontSize: 12 }}>Подпить клиента: </Text>
					<View style={{ borderBottom: '0.5px solid #000', width: 140 }}>
						{' '}
					</View>
				</View>
			</Page>
		</Document>
	);
};

const PDFViewOrder: React.FC<{ orderId: number }> = ({ orderId }) => {
	document.title = `Заказ №${orderId}`;

	const [order, setOrder] = React.useState<Order | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);

	const fetchOrder = () => {
		axios
			.get(`/api/orders/get-one/${orderId}`)
			.then((response) => {
				setOrder(response.data);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	React.useEffect(() => {
		fetchOrder();
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
			) : order ? (
				<PDFViewer showToolbar height="100%" width="100%">
					<OrderDocument order={order} />
				</PDFViewer>
			) : null}
		</>
	);
};

export default PDFViewOrder;
