'use client';

import { Role } from '@prisma/client';
import debounce from 'lodash.debounce';
import React from 'react';

import { InputSearch, Select } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';

import {
	fetchAllUsers,
	fetchFiltersUsers
} from '@/lib/redux/slices/users-slice';

import { roleFilter } from '@/settings/employees';

const EmployeesFilters = () => {
	const dispatch = useAppDispatch();

	const [role, setRole] = React.useState<Role | null>(null);
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
		if (!role && searchValue === '') {
			dispatch(fetchAllUsers());
		} else {
			dispatch(fetchFiltersUsers({ role, searchValue }));
		}
	}, [role, searchValue]);

	return (
		<div className="pb-2">
			<div className="flex justify-between">
				<div className="flex gap-4 items-center">
					<h1 className="text-sm text-zinc-500">Фильтр:</h1>
					<Select
						options={roleFilter}
						onChange={(value) => setRole(value as Role)}
						placeholder="Роль"
						value={role}
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

export default EmployeesFilters;
