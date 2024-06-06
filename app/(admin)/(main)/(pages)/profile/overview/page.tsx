'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { LuEye, LuEyeOff, LuKeySquare, LuPhone, LuUser } from 'react-icons/lu';
import { PiSealWarningBold } from 'react-icons/pi';

import { Button, RoleString } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';

export default function ProfileOverviewPage() {
	document.title = 'Обзор профиля | RomSem CRM';

	const router = useRouter();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const [isVisibRecoveryKey, setIsVisibRecoveryKey] =
		React.useState<boolean>(false);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center justify-between">
				<h1 className="font-medium text-lg">Информация</h1>
				<Button onClick={() => router.push('/profile/settings')}>
					Редактировать профиль
				</Button>
			</div>
			<div className="grid grid-cols-3">
				<div className="col-span-1 text-sm text-zinc-400 flex flex-col gap-4">
					<p>Полное имя</p>
					<p>Номер телефона</p>
					<p>Роль</p>
					<span className="flex items-center text-amber-400 gap-1">
						<PiSealWarningBold size={20} />
						<p className="text-zinc-400">Ключ восстановления</p>
					</span>
				</div>
				<div className="col-span-2 text-sm font-medium flex flex-col gap-4">
					<span className="flex items-center gap-2">
						<LuUser color="rgb(161, 161, 170)" />
						<p>
							{profile?.lastName} {profile?.firstName} {profile?.surname}
						</p>
					</span>
					<span className="flex items-center gap-2">
						<LuPhone color="rgb(161, 161, 170)" />
						<p>{profile?.phone ? profile.phone : 'Не указан'}</p>
					</span>
					<p>
						<RoleString role={profile?.role} />
					</p>
					<span className="flex items-center gap-2">
						<LuKeySquare color="rgb(161, 161, 170)" />
						<p>
							{isVisibRecoveryKey
								? profile?.recovery_key
								: Array(profile?.recovery_key?.length)
										.fill(1)
										.map((_) => '*')}
						</p>
						<span
							className="text-zinc-400 hover:text-blue-500 transition cursor-pointer"
							onClick={() => setIsVisibRecoveryKey(!isVisibRecoveryKey)}
						>
							{!isVisibRecoveryKey ? <LuEyeOff /> : <LuEye />}
						</span>
					</span>
				</div>
			</div>
			<div className="border-[1px] border-dashed border-amber-400 bg-amber-100 rounded p-3 text-amber-400 text-sm flex gap-4 items-center">
				<PiSealWarningBold size={40} />
				<p className="text-zinc-800">
					Сохраните ключ восстановления вне системы, поскольку только с его
					помощью возможно восстановаить аккаунт в случае потери доступа.
				</p>
			</div>
		</div>
	);
}
