'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { LuKeySquare, LuLogIn } from 'react-icons/lu';

import LoadingScreen from '@/components/loading-screen';

import { Button, Input } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchCurrentUser } from '@/redux/slices/profile-slice';

import { RecoveryChekSchema, RecoveryChekType } from '@/types/index';

const RecoveryChek = ({
	onValidData,
	setLogin
}: {
	onValidData: (isValid: boolean) => void;
	setLogin: (login: string) => void;
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { profile, loading } = useAppSelector((state) => state.profileSlice);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<RecoveryChekType>({
		resolver: zodResolver(RecoveryChekSchema)
	});

	const onSubmit: SubmitHandler<RecoveryChekType> = async (data) => {
		setIsLoading(true);
		await axios
			.post('/api/auth/recovery/chek', data)
			.then((response) => {
				if (response.data) {
					onValidData(true);
					setLogin(data.login);
				}
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			})
			.finally(() => setIsLoading(false));
	};

	React.useEffect(() => {
		if (!profile && loading !== 'failed') dispatch(fetchCurrentUser());
	}, []);

	React.useEffect(() => {
		if (profile) router.push('/');
	}, [profile]);

	return (
		<>
			{loading === 'succeeded' || loading === 'pending' ? (
				<LoadingScreen />
			) : (
				<div className="border-[1px] border-zinc-300 w-[400px] rounded-md overflow-hidden">
					<div className="grid gap-2">
						<div className="flex bg-[#202B46] p-4 gap-4 items-center justify-center">
							<h1 className="text-white relative text-xl font-semibold">
								Восстановление доступа
							</h1>
						</div>
						<div className="px-4 relative pb-4 text-center">
							<p className="text-sm text-zinc-400">
								Прежде чем поменять пароль, нужно убедиться что это
								действительно Ваш аккаунт. Введите Ваш логин и ключ
								восстановления.
							</p>
							<span className="absolute w-20 h-[2px] bg-zinc-300 bottom-0 left-1/2 -translate-x-1/2 rounded-sm" />
						</div>
					</div>
					<div className="p-4">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-6"
						>
							<Input
								placeholder="Логин"
								icon={<LuLogIn />}
								error={Boolean(errors.login)}
								errorMessage={errors.login?.message}
								{...register('login')}
							/>
							<Input
								placeholder="Ключ восстановления"
								icon={<LuKeySquare />}
								error={Boolean(errors.recovery_key)}
								errorMessage={errors.recovery_key?.message}
								{...register('recovery_key')}
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
			)}
		</>
	);
};

export default RecoveryChek;
