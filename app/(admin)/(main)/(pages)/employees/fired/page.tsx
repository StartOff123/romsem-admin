'use client';

import moment from 'moment';
import 'moment/locale/ru';
import Image from 'next/image';

import { Empty, RoleString } from '@/ui/index';
import Table, { IDataTable } from '@/ui/table';

import { useAppSelector } from '@/hooks/redux-hooks';

import { firedColumns } from '@/settings/employees';

import { User } from '@/types/index';

import deleteAvatar from '@/images/deleted-user.png';

export default function FiredPage() {
	document.title = 'Уволенные сотрудники | RomSem CRM';

	const { users, loading } = useAppSelector((state) => state.usersSlice);

	const data: IDataTable[] | undefined = users
		?.filter((user: User) => user.status === 'FIRED')
		.map((user: User, i: number) => {
			const { role, status, firstName, lastName, avatar, deletedAt, ...data } =
				user;

			return {
				key: i + 1,
				values: {
					...data,
					order: i + 1,
					role: <RoleString role={role} />,
					deletedAt: (
						<p className="text-zinc-400">
							{moment(deletedAt).format('L')} {moment(deletedAt).format('LT')}
						</p>
					),
					user: (
						<div className="flex items-center gap-4 p-4">
							<div className="flex items-center">
								<div className="relative">
									<div className="border-[1px] rounded-full flex items-center justify-center w-10 h-10 overflow-hidden bg-white z-10 relative">
										<Image
											src={deleteAvatar}
											width={25}
											height={25}
											alt="avatar"
										/>
									</div>
									<span
										style={{
											width: 'calc(100% + 4px)',
											height: 'calc(100% + 4px)'
										}}
										className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
									/>
								</div>
							</div>
							<div className="h-full flex flex-col justify-between items-start">
								<p className="text-sm font-medium">
									{`${firstName} ${lastName}`}
								</p>
							</div>
						</div>
					)
				}
			};
		});

	return (
		<div>
			{users &&
			users?.filter((user: User) => user.status === 'FIRED').length ? (
				<Table
					columns={firedColumns}
					data={data!}
					isLoading={loading === 'pending'}
				/>
			) : (
				<Empty text="Нет уволенных сотрудников" />
			)}
		</div>
	);
}
