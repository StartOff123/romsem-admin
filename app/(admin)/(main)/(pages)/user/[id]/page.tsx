'use client';

import moment from 'moment';
import 'moment/locale/ru';
import Image, { ImageLoader } from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

import { Button, RoleString } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchUser } from '@/redux/slices/select-user-slice';

import defaultAvatar from '@/images/user-default.png';
import userHead from '@/images/user-head.jpg';
import user from '@/images/user.jpg';

export default function UserPage() {
	const dispatch = useAppDispatch();
	const params = useParams() as { id: string };

	const { selectUser } = useAppSelector((state) => state.selectUserSlice);

	document.title = ` ${selectUser?.lastName} ${selectUser?.firstName} ${selectUser?.surname} | RomSem CRM`;

	const imageLoader: ImageLoader = ({ src, width }) => {
		return `/uploads/users/${src}?w=${width}`;
	};

	React.useEffect(() => {
		dispatch(fetchUser({ id: params.id }));
	}, []);

	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">
						Просмотр сведений о сотруднике
					</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Сотрудники - Просмотр сведений о сотруднике
					</span>
				</div>
			</div>
			<div className="py-8 flex flex-col gap-4">
				{selectUser && (
					<div className="grid grid-cols-3 gap-4">
						<div className="w-full">
							<div className="border-[1px] border-zinc-300 overflow-hidden rounded w-full">
								<div className="relative flex overflow-hidden w-full p-4 pb-0 shadow-lg">
									<Image
										src={user}
										alt="user"
										className="absolute top-0 left-0 scale-150"
									/>
									<div className="z-10 flex flex-col gap-2 items-center w-full bg-white rounded-t-lg py-4">
										<div className="rounded-full w-[130px] h-[130px] overflow-hidden">
											{selectUser.avatar ? (
												<Image
													loader={imageLoader}
													src={selectUser.avatar}
													width={130}
													height={130}
													alt="avatar"
												/>
											) : (
												<Image
													src={defaultAvatar}
													width={130}
													height={130}
													alt="avatar"
												/>
											)}
										</div>
										<h1 className="font-medium text-zinc-600">
											{selectUser.lastName} {selectUser.firstName}{' '}
											{selectUser.surname}
										</h1>
										<RoleString role={selectUser.role} />
									</div>
								</div>
								<div className="p-4">
									<p className="text-sm text-zinc-400 font-medium">
										{selectUser.description
											? selectUser.description
											: 'Пользователь ничего не написал о себе'}
									</p>
									<div className="flex justify-end">
										<Button btnType="denger">
											<span className="flex items-center gap-2">
												<p>Уволить</p>
												<FaRegTrashCan />
											</span>
										</Button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-span-2 grid gap-4">
							<div className="flex items-center h-[150px] overflow-hidden rounded-lg">
								<Image src={userHead} alt="user" />
							</div>
							<div className="flex flex-col gap-2 p-4 border-[1px] border-zinc-300 rounded">
								<h1 className="font-semibold pb-2">Информация</h1>
								<div>
									<h1 className="font-medium text-zinc-600">
										Идентификатор аккаунта
									</h1>
									<p className="text-[13px] text-zinc-400">{selectUser.id}</p>
								</div>
								<div>
									<h1 className="font-medium text-zinc-600">Номер телефона</h1>
									<p className="text-[13px] text-zinc-400">
										{selectUser.phone}
									</p>
								</div>
								<div>
									<h1 className="font-medium text-zinc-600">
										Дата создания аккаунта
									</h1>
									<p className="text-[13px] text-zinc-400">
										{moment(selectUser.createdAt).format('L')}{' '}
										{moment(selectUser.createdAt).format('LT')}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
