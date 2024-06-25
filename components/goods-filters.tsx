'use client';

import debounce from 'lodash.debounce';
import React from 'react';

import { InputSearch, Select } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';

import { fetchAllGoods, fetchFiltersGoods } from '@/redux/slices/goods-slice';

import { productTypeFilter, sortFilter } from '@/settings/goods';

const GoodsFilters = () => {
	const dispatch = useAppDispatch();

	const [sort, setSort] = React.useState<string | null>(null);
	const [productType, setProductType] = React.useState<string | null>(null);
	const [searchValue, setSearchValue] = React.useState<string>('');
	const [rootSearchValue, setRootSearchValue] = React.useState<string>('');

	const handleChangeSearch = React.useCallback(
		debounce((value: string) => {
			setSearchValue(value);
		}, 500),
		[]
	);

	React.useEffect(() => {
		handleChangeSearch(rootSearchValue);
	}, [rootSearchValue]);

	React.useEffect(() => {
		dispatch(fetchFiltersGoods({ productType, searchValue, sort }));
	}, [sort, productType, searchValue]);

	return (
		<div className="py-4">
			<div className="flex justify-between">
				<div className="flex gap-4 items-center">
					<h1 className="text-sm text-zinc-500">Фильтр:</h1>
					<Select
						options={productTypeFilter}
						onChange={(value) => setProductType(value)}
						placeholder="Категория"
						value={productType}
					/>
					<Select
						className="w-[210px]"
						options={sortFilter}
						onChange={(value) => setSort(value)}
						placeholder="Сортировка"
						value={sort}
					/>
				</div>
				<div>
					<InputSearch
						placeholder="Поиск"
						value={rootSearchValue}
						onChangeSearch={(value) => setRootSearchValue(value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default GoodsFilters;
