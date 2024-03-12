'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { LuLock } from 'react-icons/lu';

import { Button, Input } from '@/ui/index';

import {
	RecoveryResetPasswordSchema,
	RecoveryResetPasswordType
} from '@/types/index';

const RecoveryResetPassword = ({
	isValid,
	login
}: {
	isValid: boolean;
	login: string;
}) => {
	const router = useRouter();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RecoveryResetPasswordType>({
		resolver: zodResolver(RecoveryResetPasswordSchema)
	});

	const onSubmit: SubmitHandler<RecoveryResetPasswordType> = async (data) => {
		setIsLoading(true);
		await axios
			.patch('/api/auth/recovery/reset-password', { ...data, login })
			.then((response) => {
				if (response.data) {
					toast.success('Пароль успешно изменен');
					router.push('/auth');
				}
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			})
			.finally(() => setIsLoading(false));
	};

	React.useEffect(() => {
		if (!isValid) router.push('/auth');
	}, []);

	return (
		<div className="border-[1px] border-zinc-300 w-[400px] rounded-md overflow-hidden">
			<div className="grid gap-2">
				<div className="flex bg-[#202B46] p-4 gap-4 items-center justify-center">
					<h1 className="text-white relative text-xl font-semibold">
						Восстановление доступа
					</h1>
				</div>
				<div className="px-4 relative pb-4 text-center">
					<p className="text-sm text-zinc-400">
						Задайте новый пароль и сохраните его. Если вы забудете ключа
						восстановления, то аккаунт будет навсегда утерян, будте внимательны!
					</p>
					<span className="absolute w-20 h-[2px] bg-zinc-300 bottom-0 left-1/2 -translate-x-1/2 rounded-sm" />
				</div>
			</div>
			<div className="p-4">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<Input
						placeholder="Новый пароль"
						type="password"
						icon={<LuLock />}
						error={Boolean(errors.password)}
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
					<Input
						placeholder="Подтвердите пароль"
						type="password"
						icon={<LuLock />}
						error={Boolean(errors.confirmPass)}
						errorMessage={errors.confirmPass?.message}
						{...register('confirmPass')}
					/>
					<Button isLoading={isLoading}>Подтвердить</Button>
				</form>
				<div className="pt-4">
					<Link
						href="/auth"
						className="text-xs text-zinc-400 hover:text-sky-500 flex gap-1 items-center"
					>
						<IoIosArrowRoundBack size={20} />
						Вернуться назад
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RecoveryResetPassword;
