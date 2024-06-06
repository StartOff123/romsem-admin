import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLock } from 'react-icons/lu';

import { Button, Input } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { editProfile } from '@/redux/slices/profile-slice';

import { ResetPasswordSchema, ResetPasswordType, User } from '@/types/index';

const ResetPasswordForm = () => {
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ResetPasswordType>({
		resolver: zodResolver(ResetPasswordSchema)
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		await axios
			.patch(`/api/profile/reset-password/${profile?.id}`, values)
			.then((response) => {
				dispatch(editProfile(response.data as User));
				toast.success('Пароль успешно обновлен');
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
					<div className="grid grid-cols-3 gap-4">
						<div className="flex flex-col gap-2">
							<h1 className="text-[15px] font-medium text-zinc-700">
								Текуший пароль
							</h1>
							<Input
								placeholder="Текущий пароль"
								type="password"
								icon={<LuLock />}
								error={Boolean(errors.currentPassword)}
								errorMessage={errors.currentPassword?.message}
								{...register('currentPassword')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-[15px] font-medium text-zinc-700 ">
								Введите новый пароль
							</h1>
							<Input
								placeholder="Новый пароль"
								type="password"
								icon={<LuLock />}
								error={Boolean(errors.password)}
								errorMessage={errors.password?.message}
								{...register('password')}
							/>
						</div>
						<div className="flex flex-col gap-2">
							<h1 className="text-[15px] font-medium text-zinc-700 ">
								Подтвердите пароль
							</h1>
							<Input
								placeholder="Подтвердите пароль"
								type="password"
								icon={<LuLock />}
								error={Boolean(errors.confirmPass)}
								errorMessage={errors.confirmPass?.message}
								{...register('confirmPass')}
							/>
						</div>
					</div>
					<div className="flex justify-end gap-2">
						<Button isLoading={isLoading} type="submit">
							Обновить пароль
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
						<h1 className="text-[15px] text-zinc-700 font-medium">Пароль</h1>
						<p className="text-[13px] text-zinc-400">*****************</p>
					</div>
					<Button btnType="outlined" onClick={() => setIsOpen(true)}>
						Сбросить пароль
					</Button>
				</div>
			)}
		</div>
	);
};

export default ResetPasswordForm;
