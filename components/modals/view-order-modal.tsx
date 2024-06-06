import moment from 'moment';
import 'moment/locale/ru';
import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';
import { LuPrinter } from 'react-icons/lu';

import { Button, Modal, OrderString } from '@/ui/index';

import { useModal } from '@/hooks/use-modal-store';

import { DeliveryEnum, PaymentEnum } from '@/types/index';

import { calcTotalPrice } from '@/utils/calc-total-price';
import { numberWithSpaces } from '@/utils/number-with-spaces';

const ViewOrderModal = () => {
	const { isOpen, onClose, data, type } = useModal();
	const { orderData } = data;

	const isModalOpen = isOpen && type === 'view-order';

	return (
		<Modal
			isOpen={isModalOpen}
			onChangeClose={onClose}
			isCloseBtn={false}
			className="w-[400px]"
		>
			<div className="p-4 flex flex-col gap-4">
				<div className="flex items-center justify-between pb-2 border-b-[1px] border-zinc-300">
					<h1>Заказ №{orderData?.id}</h1>
					<p className="text-xs text-zinc-400">
						от {moment(orderData?.createdAt).format('L')}{' '}
						{moment(orderData?.createdAt).format('LT')}
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<div>
						<h1 className="bg-[#202B46] text-white px-2 py-1 rounded text-sm">
							Общие данные
						</h1>
						<div className="p-2 flex flex-col gap-1">
							<span className="flex text-sm gap-2">
								<p>Заказчик</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.name}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Номер телефона</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.phone}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Email</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.email ? orderData.email : 'Не указан'}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Статус</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<OrderString orderStatus={orderData?.status} />
							</span>
							{orderData?.comments && (
								<span className="flex text-sm gap-2 pt-2">
									<p>Комментарий: </p>
									<p>{orderData?.comments}</p>
								</span>
							)}
						</div>
					</div>
					<div>
						<h1 className="bg-[#202B46] text-white px-2 py-1 rounded text-sm">
							Данные доставки
						</h1>
						<div className="p-2 flex flex-col gap-1">
							<span className="flex text-sm gap-2">
								<p>Способ доставки</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{DeliveryEnum[orderData?.delivery!]}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Способ оплаты</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{PaymentEnum[orderData?.payment!]}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Улица</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.street}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Дом</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.house}</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Квартира</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>
									{orderData?.apartment ? orderData.apartment : 'Не указана'}
								</p>
							</span>
							<span className="flex text-sm gap-2">
								<p>Подъезд</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{orderData?.entrance ? orderData.entrance : 'Не указан'}</p>
							</span>
						</div>
					</div>
					<div>
						<h1 className="bg-[#202B46] text-white px-2 py-1 rounded text-sm">
							Товары
						</h1>
						<div className="py-2 flex flex-col gap-1">
							{orderData?.products &&
								orderData.products.map((product) => (
									<div
										key={product.id}
										className="flex border-[1px] border-zinc-300 rounded p-2 gap-2"
									>
										<div>
											<Image
												src={product.image}
												width={90}
												height={90}
												alt={product.title}
											/>
										</div>
										<div className="flex-1 flex flex-col items-end justify-between py-1">
											<h1 className="font-semibold">{product.title}</h1>
											<p className="font-semibold">
												{numberWithSpaces(Number(product.price))} ₽
											</p>
										</div>
									</div>
								))}
							<span className="flex text-sm gap-2">
								<p>Сумма заказа</p>
								<span className="flex-1 border-dashed border-b-[1px] border-zinc-300 mb-1" />
								<p>{numberWithSpaces(calcTotalPrice(orderData?.products))} ₽</p>
							</span>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-2">
					{orderData?.status !== 'ISSUED' && (
						<Link
							href={`/print/order/${orderData?.id}`}
							target="_blank"
							className="flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-500 py-2 px-3 rounded text-sm transition min-w-[80px]"
						>
							<p>Печать</p>
							<LuPrinter />
						</Link>
					)}
					<Button btnType="outlined" onClick={onClose}>
						Закрыть
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ViewOrderModal;
