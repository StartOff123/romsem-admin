'use client';

import React from 'react';

import GoodsCard from '@/components/goods-cart';
import GoodsFilters from '@/components/goods-filters';

import AddProductForm from '@/forms/add-product-form';

import { AddButton, Empty } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import { fetchAllGoods } from '@/lib/redux/slices/goods-slice';

import { Product } from '@/types/index';

import { numberWithSpaces } from '@/utils/number-with-spaces';

export default function GoodsPage() {
	document.title = 'Товары | RomSem CRM';

	const { onOpen, onClose } = useModal();
	const dispatch = useAppDispatch();

	const { goods, loading, isFilters } = useAppSelector(
		(state) => state.goodsSlice
	);

	const { profile } = useAppSelector((state) => state.profileSlice);

	React.useEffect(() => {
		dispatch(fetchAllGoods());
	}, [dispatch]);

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Товары</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Товары
					</span>
				</div>
				{profile?.role === 'ADMIN' && (
					<div>
						<AddButton
							onClick={() =>
								onOpen('adding-product', {
									children: <AddProductForm onClose={onClose} />
								})
							}
						/>
					</div>
				)}
			</div>
			<GoodsFilters />
			<div className="pb-8">
				{loading === 'pending' && (
					<div className="flex flex-col gap-2">
						<div>
							<span className="h-4 w-full bg-zinc-200 animate-pulse rounded-md block"></span>
						</div>
						<div className="grid grid-cols-4 gap-4">
							{Array(12)
								.fill(1)
								.map((_, i) => (
									<div
										key={i}
										className="bg-zinc-200 animate-pulse rounded-md w-full h-[300px]"
									></div>
								))}
						</div>
					</div>
				)}
				{loading === 'succeeded' &&
					goods &&
					(goods.length ? (
						<div className="flex flex-col gap-2">
							<div className="flex gap-4">
								<p className="text-zinc-500 text-xs">
									Количество позиций: {goods?.length}
								</p>
								<p className="text-zinc-500 text-xs">
									Общая сумма товаров:{' '}
									{numberWithSpaces(
										goods?.reduce(
											(sum: number, item: Product) => sum + Number(item.price),
											0
										)
									)}{' '}
									₽
								</p>
							</div>
							<div className="grid grid-cols-4 gap-4">
								{isFilters
									? [...goods].map((item) => (
											<GoodsCard key={item.id} item={item} />
										))
									: [...goods]
											.reverse()
											.map((item) => <GoodsCard key={item.id} item={item} />)}
							</div>
						</div>
					) : (
						<Empty
							text={
								isFilters
									? 'Ничего не найдено'
									: 'Ни одного товара еще не добавленно'
							}
						/>
					))}
			</div>
		</div>
	);
}
