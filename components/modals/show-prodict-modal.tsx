import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Button, Modal } from '@/ui/index';

import { useModal } from '@/hooks/use-modal-store';

import { CategoryEnum } from '@/types/index';

import { compountString } from '@/utils/compount-string';
import { numberWithSpaces } from '@/utils/number-with-spaces';

const ShowProductModal = () => {
	const { isOpen, onClose, data, type } = useModal();
	const { productData } = data;

	const isModalOpen = isOpen && type === 'show-product';

	return (
		<Modal isOpen={isModalOpen} onChangeClose={onClose} className="max-w-full">
			<div className="flex flex-col gap-4 p-4 pt-0">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Image
							src={productData?.image!}
							width={400}
							height={400}
							alt={productData?.image!}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<h1 className="text-xl font-semibold bg-[#202B46] text-white bg-opacity-90 text-center rounded">
								{productData?.title}
							</h1>
							<p className="text-sm text-zinc-400">
								{productData?.description}
							</p>
						</div>
						<div className="pt-4">
							<b>Состав: </b>
							<p className="text-sm text-zinc-400">
								{compountString(productData?.compound!)}
							</p>
						</div>
						<div className="p-2 border-[1px] border-zinc-300 rounded flex flex-col gap-2">
							<div className="flex text-sm gap-1">
								<p>Цена</p>
								<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
								<p className="font-semibold">
									{numberWithSpaces(Number(productData?.price))} ₽
								</p>
							</div>
							<div className="flex text-sm gap-1">
								<p>Тип</p>
								<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
								<p className="font-semibold">
									{
										CategoryEnum[
											productData?.type! as keyof typeof CategoryEnum
										]
									}
								</p>
							</div>
							{productData?.details.size && (
								<div className="flex text-sm gap-1">
									<p>Диаметр</p>
									<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
									<p className="font-semibold">
										{productData?.details.size} см.
									</p>
								</div>
							)}
							{productData?.details.volume &&
								(productData?.type === 'BEVERAGES' ? (
									<div className="flex text-sm gap-1">
										<p>Объем</p>
										<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
										<p className="font-semibold">
											{productData?.details.volume} мл.
										</p>
									</div>
								) : (
									<div className="flex text-sm gap-1">
										<p>Вес</p>
										<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
										<p className="font-semibold">
											{productData?.details.volume} гр.
										</p>
									</div>
								))}
							{productData?.details.pieces && (
								<div className="flex text-sm gap-1">
									<p>Кол-во кусочков</p>
									<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
									<p className="font-semibold">
										{productData?.details.pieces} шт.
									</p>
								</div>
							)}
							<div className="flex text-sm gap-1">
								<p>Заказов</p>
								<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
								<p className="font-semibold">{productData?.popularity}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-end gap-2">
					<Button>
						<span className="flex items-center gap-2">
							Показать на сайте
							<FaExternalLinkAlt />
						</span>
					</Button>
					<Button btnType="outlined" onClick={onClose}>
						Закрыть
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ShowProductModal;
