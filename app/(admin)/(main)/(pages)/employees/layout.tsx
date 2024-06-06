'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import AddUserForm from '@/forms/add-user-form';

import { AddButton } from '@/ui/index';
import Tabs, { TabsItem } from '@/ui/tabs';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import { fetchAllUsers } from '@/redux/slices/users-slice';

export default function EmployeesLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const { onOpen, onClose } = useModal();

	const { profile } = useAppSelector((state) => state.profileSlice);
	const [pageNum, setPageNum] = React.useState<number | undefined>(undefined);

	const tabsItems: TabsItem[] = [
		{
			key: 1,
			label: 'Действующие сотрудники',
			children,
			onClick: () => router.push('/employees/active')
		},
		{
			key: 2,
			label: 'Уволенные сотрудники',
			children,
			onClick: () => router.push('/employees/fired')
		}
	];

	React.useEffect(() => {
		switch (pathname) {
			case '/employees/active':
				setPageNum(1);
				break;
			case '/employees/fired':
				setPageNum(2);
				break;
			default:
				setPageNum(undefined);
		}
	}, [pathname]);

	React.useEffect(() => {
		dispatch(fetchAllUsers());
	}, []);

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Сотрудники</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Сотрудники
					</span>
				</div>
				{profile?.role === 'ADMIN' && (
					<div>
						<AddButton
							onClick={() =>
								onOpen('adding-user', {
									children: <AddUserForm onClose={onClose} />
								})
							}
						/>
					</div>
				)}
			</div>
			<div className="py-4">
				<Tabs items={tabsItems} defaultActiveKey={pageNum} />
			</div>
		</div>
	);
}
