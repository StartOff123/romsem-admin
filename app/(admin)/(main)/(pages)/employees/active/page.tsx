'use client';

import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

import EmployeesFilters from '@/components/employees-filters';

import RemoveUserForm from '@/forms/remove-user-form';

import { Button, Clue, Empty, RoleString } from '@/ui/index';
import Table, { IDataTable } from '@/ui/table';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import { employeesColumns } from '@/settings/employees';

import { User } from '@/types/index';

import defaultAvatar from '@/images/user-default.png';

export default function ActivePage() {
	document.title = 'Дейвствующие сотрудники | RomSem CRM';

	const { onOpen, onClose } = useModal();
	const { profile } = useAppSelector((state) => state.profileSlice);
	const { users, loading } = useAppSelector((state) => state.usersSlice);

	const sortUsers: User[] | null = users
		? [
				...users?.filter((user: User) => user.id === profile?.id),
				...users?.filter(
					(user: User) => user.status === 'ACTIVE' && user.id !== profile?.id
				)
			]
		: null;

	const data: IDataTable[] | undefined = sortUsers?.map((user, i) => {
		const {
			role,
			status,
			login,
			avatar,
			firstName,
			lastName,
			createdAt,
			...data
		} = user;

		return {
			key: i + 1,
			values: {
				...data,
				order: i + 1,
				role: <RoleString role={role} />,
				createdAt: (
					<p className="text-zinc-400">
						{moment(createdAt).format('L')} {moment(createdAt).format('LT')}
					</p>
				),
				user: (
					<div className="flex items-center gap-4 p-4">
						<div className="flex items-center">
							<div className="relative">
								<div className="border-[1px] rounded-full w-10 h-10 overflow-hidden border-white z-10 relative">
									{avatar ? (
										<Image src={avatar} width={40} height={40} alt="avatar" />
									) : (
										<Image
											src={defaultAvatar}
											width={40}
											height={40}
											alt="avatar"
										/>
									)}
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
							<Link
								href={`/user/${user.id}`}
								className={classNames(
									'text-sm font-medium',
									profile?.id !== user.id
										? 'hover:text-sky-500 cursor-pointer transition pointer-events-auto'
										: 'pointer-events-none'
								)}
							>
								{`${firstName} ${lastName}`}
							</Link>
							<p className="text-xs text-zinc-400">{login}</p>
						</div>
					</div>
				),
				actions:
					profile?.role === 'ADMIN' ? (
						<div className="flex gap-2 justify-center">
							{user.id === profile?.id ? (
								<p className="text-xs text-zinc-400">Это вы</p>
							) : (
								<Clue clueText="Уволить сотрудника">
									<Button
										className="min-w-min"
										btnType="denger"
										onClick={() =>
											onOpen('remove-user', {
												children: (
													<RemoveUserForm onClose={onClose} id={user.id} />
												)
											})
										}
									>
										<FaRegTrashCan />
									</Button>
								</Clue>
							)}
						</div>
					) : (
						<p className="text-xs text-zinc-400">Нет доступа</p>
					)
			}
		};
	});

	return (
		<div className="flex flex-col gap-2">
			<EmployeesFilters />
			{(users &&
				users.filter((user: User) => user.status === 'ACTIVE').length) ||
			loading === 'pending' ? (
				<>
					<div>
						{loading === 'succeeded' ? (
							<p className="text-zinc-500 text-xs">
								Всего сотрудников: {data?.length}
							</p>
						) : (
							<span className="h-4 w-full bg-zinc-200 animate-pulse rounded-md block"></span>
						)}
					</div>
					<Table
						columns={employeesColumns}
						data={data!}
						isLoading={loading === 'pending'}
						skeletonColCount={4}
						skeletonHeight={88}
					/>
				</>
			) : (
				<Empty text="Ничего не найдено" />
			)}
		</div>
	);
}
