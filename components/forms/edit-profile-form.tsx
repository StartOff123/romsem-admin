import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuPhone, LuUser } from 'react-icons/lu';

import { Button, Input, PhoneInput, Textarea, Upload } from '@/ui/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';

import { editProfile } from '@/redux/slices/profile-slice';

import { EditProfileSchema, EditProfileType, User } from '@/types/index';

const EditProfileForm = () => {
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const {
		control,
		register,
		formState: { errors },
		handleSubmit
	} = useForm<EditProfileType>({
		resolver: zodResolver(EditProfileSchema),
		values: {
			firstName: profile?.firstName!,
			lastName: profile?.lastName!,
			surname: profile?.surname!,
			avatar: profile?.avatar as string,
			description: profile?.description as string | undefined,
			phone: profile?.phone!
		}
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		await axios
			.patch(`/api/profile/edit/${profile?.id}`, values)
			.then((response) => {
				dispatch(editProfile(response.data as User));
				toast.success('Данные сохраннены');
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			})
			.finally(() => setIsLoading(false));
	});

	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col gap-6 border-[1px] border-zinc-300 px-3 py-4 rounded"
		>
			<div className="grid grid-cols-4 text-sm text-zinc-700">
				<p>Аватар</p>
				<div className="flex gap-4 col-span-2 items-center">
					<Controller
						name="avatar"
						control={control}
						render={({ field }) => (
							<Upload
								endpoint="userAvatarImage"
								value={field.value}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>
					<p className="text-sm text-zinc-400">
						Рекомендуемый размер изображения 150x150.
					</p>
				</div>
			</div>
			<div className="grid grid-cols-4 text-sm text-zinc-700 items-center">
				<p>
					Полное имя <span className="text-red-500">*</span>
				</p>
				<div className="col-span-2 flex gap-2">
					<Input
						placeholder="Фамилия"
						icon={<LuUser />}
						error={Boolean(errors.lastName)}
						errorMessage={errors.lastName?.message}
						{...register('lastName')}
					/>
					<Input
						placeholder="Имя"
						icon={<LuUser />}
						error={Boolean(errors.firstName)}
						errorMessage={errors.firstName?.message}
						{...register('firstName')}
					/>
					<Input
						placeholder="Отчество"
						icon={<LuUser />}
						error={Boolean(errors.surname)}
						errorMessage={errors.surname?.message}
						{...register('surname')}
					/>
				</div>
			</div>
			<div className="grid grid-cols-4 text-sm text-zinc-700">
				<p>
					Номер телефона <span className="text-red-500">*</span>
				</p>
				<div className="col-span-2 flex">
					<div>
						<Controller
							name="phone"
							control={control}
							render={({ field }) => (
								<PhoneInput
									placeholder="Номер"
									value={field.value}
									icon={<LuPhone />}
									error={Boolean(errors.phone)}
									errorMessage={errors.phone?.message}
									onChange={(value) => field.onChange(value)}
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-4 text-sm text-zinc-700">
				<p>О себе</p>
				<div className="col-span-3">
					<Textarea
						placeholder="Напишите о себе что-нибудь"
						{...register('description')}
						defaultRows={3}
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button isLoading={isLoading} type="submit">
					Сохранить
				</Button>
			</div>
		</form>
	);
};

export default EditProfileForm;
