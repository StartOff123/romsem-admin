'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import ProfileHead from '@/components/profile-head';

import { Tabs } from '@/ui/index';
import { TabsItem } from '@/ui/tabs';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function ProfileLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const [pageNum, setPageNum] = React.useState<number | undefined>(undefined);

	const tabsItems: TabsItem[] = [
		{
			key: 1,
			label: 'Обзор',
			children,
			onClick: () => router.push('/profile/overview')
		},
		{
			key: 2,
			label: 'Настройки',
			children,
			onClick: () => router.push('/profile/settings')
		}
	];

	React.useEffect(() => {
		switch (pathname) {
			case '/profile/overview':
				setPageNum(1);
				break;
			case '/profile/settings':
				setPageNum(2);
				break;
			default:
				setPageNum(undefined);
		}
	}, [pathname]);

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Профиль</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Профиль
					</span>
				</div>
			</div>
			{profile && (
				<div className="pb-8 flex flex-col gap-4">
					<ProfileHead
						description={profile.description}
						avatar={profile.avatar}
						role={profile.role}
						name={{
							firstName: profile.firstName,
							lastName: profile.lastName
						}}
					/>
					<Tabs items={tabsItems} defaultActiveKey={pageNum} />
				</div>
			)}
		</div>
	);
}
