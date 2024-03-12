'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLock, LuLogIn } from 'react-icons/lu';

import LoadingScreen from '@/components/loading-screen';

import { Button, Input } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { fetchCurrentUser } from '@/redux/slices/profile-slice';

import { AuthSchema, AuthType } from '@/types/index';

const AuthForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const { profile, loading } = useAppSelector((state) => state.profileSlice);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<AuthType>({
		resolver: zodResolver(AuthSchema)
	});

	const onSubmit: SubmitHandler<AuthType> = async (data) => {
		setIsLoading(true);
		signIn('credentials', {
			...data,
			redirect: false
		})
			.then((callback) => {
				if (callback?.error) {
					toast.error('Неправильный логин или пароль');
					return;
				}

				router.push('/');
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
				<div className="border-[1px] border-zinc-300 rounded-md overflow-hidden">
					<div className="flex bg-[#202B46] p-4 gap-4 items-center justify-center">
						<h1 className="text-white relative text-xl font-semibold before:absolute before:w-[1px] before:h-full before:bg-white before:-right-2.5">
							Авторизация
						</h1>
						<h1 className="uppercase text-white text-xl">romsem</h1>
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
								placeholder="Пароль"
								type="password"
								icon={<LuLock />}
								error={Boolean(errors.password)}
								errorMessage={errors.password?.message}
								{...register('password')}
							/>
							<Button isLoading={isLoading}>Войти</Button>
						</form>
						<div className="pt-4 flex justify-end">
							<Link
								href="/auth/recovery"
								className="text-xs text-zinc-400 hover:text-sky-500"
							>
								Восстановление доспупа
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AuthForm;
