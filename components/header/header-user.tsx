import classNames from 'classnames';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { RxExit } from 'react-icons/rx';

import { RoleString } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import profileFon from '@/images/profile.jpg';
import defaultAvatar from '@/images/user-default.png';

interface IList {
	title: string;
	href?: string;
	onClick?: () => void;
	icon: React.ReactNode;
	isDenger: boolean;
}

const HeaderUser = () => {
	const { onOpen } = useModal();
	const ref = React.useRef<HTMLDivElement>(null);

	const { profile } = useAppSelector((state) => state.profileSlice);

	const list: IList[] = [
		{
			title: 'Профиль',
			icon: <FaRegUser />,
			href: '/profile/overview',
			isDenger: false
		},
		{
			title: 'Настройки',
			icon: <IoSettingsOutline />,
			href: '/profile/settings',
			isDenger: false
		},
		{
			title: 'Выйти',
			icon: <RxExit />,
			onClick: () =>
				onOpen('confirmation', {
					сonfirmationmData: {
						children: (
							<div>
								<h1 className="font-bold text-lg">
									Вы точно хотите выйти из системы?
								</h1>
								<p className="text-sm text-zinc-400">
									После выхода Вам потребуется заново войти, чтобы продолжить
									работу.
								</p>
							</div>
						),
						confirmBtnText: 'Выйти',
						onConfirm: () => signOut()
					}
				}),
			isDenger: true
		}
	];

	return (
		<div className="group relative">
			<div className="relative">
				<div className="cursor-pointer border-[1px] rounded-full w-10 h-10 overflow-hidden border-white z-10 relative">
					{profile?.avatar ? (
						<Image
							src={profile.avatar}
							width={40}
							height={40}
							alt="avatar"
							fill
						/>
					) : (
						<Image src={defaultAvatar} width={40} height={40} alt="avatar" />
					)}
				</div>
				<span
					style={{ width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
				/>
			</div>
			<span
				style={{ width: ref.current ? ref.current.scrollWidth : 0 }}
				className="absolute h-2 right-0 hidden group-hover:block"
			/>
			<div
				ref={ref}
				className="
                absolute border-[1px] border-zinc-200 rounded bg-white right-0 min-w-[300px] transition-all z-30 shadow-xl overflow-hidden opacity-0 pointer-events-none translate-y-4
                group-hover:opacity-100
                group-hover:pointer-events-auto
                group-hover:translate-y-2
            "
			>
				<div className="relative overflow-hidden border-b-[1px] border-zinc-200 p-4">
					<Image
						src={profileFon}
						alt="profile"
						className="absolute left-0 top-0 -z-[1]"
					/>
					<div className="bg-white flex gap-4 p-4 rounded-l-[40px] rounded-r-lg shadow-lg">
						<div className="flex items-center">
							<div className="relative">
								<div className="border-[1px] rounded-full w-10 h-10 overflow-hidden border-white z-10 relative">
									{profile?.avatar ? (
										<Image
											src={profile.avatar}
											width={40}
											height={40}
											fill
											alt="avatar"
										/>
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
						<div className="h-full flex flex-col justify-between z-10">
							<h1 className="text-sm font-medium">{`${profile?.firstName} ${profile?.lastName}`}</h1>
							<RoleString role={profile?.role} />
						</div>
					</div>
				</div>
				<div className="p-2 flex flex-col gap-1">
					{list.map((item, i) =>
						item.href ? (
							<Link
								key={i}
								href={item.href}
								className={classNames(
									'flex items-center gap-2 py-1 px-3 rounded transition cursor-pointer',
									item.isDenger ? 'hover:text-red-500' : 'hover:text-sky-500'
								)}
							>
								{item.icon}
								<p className="text-sm">{item.title}</p>
							</Link>
						) : (
							<div
								key={i}
								className={classNames(
									'flex items-center gap-2 py-1 px-3 rounded transition cursor-pointer',
									item.isDenger ? 'hover:text-red-500' : 'hover:text-sky-500'
								)}
								onClick={() => (item.onClick ? item.onClick() : null)}
							>
								{item.icon}
								<p className="text-sm">{item.title}</p>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default HeaderUser;
