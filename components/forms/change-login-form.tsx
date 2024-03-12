import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLock, LuLogIn } from 'react-icons/lu';

import { Button, Input } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { editProfile } from '@/redux/slices/profile-slice';

import { ChangeLoginSchema, ChangeLoginType, User } from '@/types/index';

const ChangeLoginForm = () => {
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ChangeLoginType>({
		resolver: zodResolver(ChangeLoginSchema),
		values: {
			login: profile?.login!,
			password: ''
		}
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		await axios
			.patch(`/api/profile/change-login/${profile?.id}`, values)
			.then((response) => {
				dispatch(editProfile(response.data as User));
				toast.success('Логин успешно обновлен');
				reset();
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			})
			.finally(() => setIsLoading(false));
	});

	return (
		<div className="py-4">
			{isOpen ? (
				<form onSubmit={onSubmit} className="flex flex-col gap-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col gap-2">
							<h1 className="text-[15px] font-medium text-zinc-700 ">
								Введите новый логин
							</h1>
							<Input
								placeholder="Логин"
								icon={<LuLogIn />}
								error={Boolean(errors.login)}
								errorMessage={errors.login?.message}
								{...register('login')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-[15px] font-medium text-zinc-700 ">
								Введите пароль
							</h1>
							<Input
								placeholder="Пароль"
								type="password"
								icon={<LuLock />}
								error={Boolean(errors.password)}
								errorMessage={errors.password?.message}
								{...register('password')}
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2">
						<Button isLoading={isLoading} type="submit">
							Обновить логин
						</Button>
						<Button
							btnType="outlined"
							onClick={() => {
								setIsOpen(false);
								reset();
							}}
						>
							Отмена
						</Button>
					</div>
				</form>
			) : (
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-[15px] text-zinc-700 font-medium">Логин</h1>
						<p className="text-[13px] text-zinc-400">{profile?.login}</p>
					</div>
					<Button btnType="outlined" onClick={() => setIsOpen(true)}>
						Изменить логин
					</Button>
				</div>
			)}
		</div>
	);
};

export default ChangeLoginForm;
