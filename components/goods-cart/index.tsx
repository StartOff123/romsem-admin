import Image from 'next/image';
import React from 'react';

import CardContext from '@/components/goods-cart/goods-card-context';

import { useModal } from '@/hooks/use-modal-store';

import { CategoryEnum, Product } from '@/types/index';

import { numberWithSpaces } from '@/utils/number-with-spaces';

const GoodsCard = ({ item }: { item: Product }) => {
	const { onOpen } = useModal();

	const ref = React.useRef<HTMLDivElement>(null);
	const [widthImage, setWidthImage] = React.useState<number>(0);

	React.useEffect(() => {
		if (ref.current) {
			setWidthImage(ref.current.scrollWidth);
		}
	}, [ref]);

	return (
		<div
			ref={ref}
			className="relative px-4 py-2 rounded border-[1px] border-zinc-300 flex flex-col gap-4 overflow-hidden hover:border-blue-500 hover:shadow-xl cursor-pointer transition"
			onDoubleClick={() => onOpen('show-product', { productData: item })}
		>
			<CardContext product={item} />
			<div
				style={{ height: widthImage }}
				className="flex-1 flex items-center p-2"
			>
				<Image
					width={widthImage}
					height={widthImage}
					src={item.image!}
					alt={item.title}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="px-2 py-1 text-center bg-[#202B46] text-white bg-opacity-90 rounded text-sm text-ellipsis text-nowrap overflow-hidden">
					{item.title}
				</h1>
				<div className="flex flex-col gap-2 border-[1px] border-zinc-300 p-2 rounded">
					<div className="flex text-sm gap-1">
						<p>Цена</p>
						<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
						<p className="font-semibold">
							{numberWithSpaces(Number(item.price))} ₽
						</p>
					</div>
					<div className="flex text-sm gap-1">
						<p>Тип</p>
						<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
						<p className="font-semibold">{CategoryEnum[item.type!]}</p>
					</div>
					<div className="flex text-sm gap-1">
						<p>Заказов</p>
						<span className="flex-1 border-b-[1px] border-dashed border-black -translate-y-1"></span>
						<p className="font-semibold">{item.popularity}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GoodsCard;
