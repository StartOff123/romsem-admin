import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuLock, LuLogIn, LuPhone, LuUser } from 'react-icons/lu';

import { Button, Input, PhoneInput, Select } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';

import { CreateUserDTO } from '@/lib/dto/create-user.dto';

import { addUser } from '@/redux/slices/users-slice';

import { roleFilter } from '@/settings/employees';

import { RegisterUserSchema, RegisterUserType, User } from '@/types/index';

const AddUserForm = ({ onClose }: { onClose: () => void }) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const {
		register,
		reset,
		handleSubmit,
		control,
		formState: { errors },
		clearErrors
	} = useForm<RegisterUserType>({
		resolver: zodResolver(RegisterUserSchema)
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);
		const { confirmPass, ...otherData } = values;

		const data: CreateUserDTO = otherData;

		await axios
			.post('/api/users/create', data)
			.then((response) => {
				dispatch(addUser(response.data as User));
				toast.success('Сотрудник успешно зарегестрирован');
				reset();
				onClose();
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			})
			.finally(() => setIsLoading(false));
	});

	const handleCloseForm = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		clearErrors();
		onClose();
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-2 p-4">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-6">
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
					<div className="flex gap-2">
						<Controller
							name="role"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<Select
									options={roleFilter}
									error={Boolean(errors.role)}
									errorMessage={errors.role?.message}
									placeholder="Роль"
									value={field.value}
									onChange={(value) => field.onChange(value)}
								/>
							)}
						/>
						<Input
							placeholder="Логин"
							icon={<LuLogIn />}
							error={Boolean(errors.login)}
							errorMessage={errors.login?.message}
							{...register('login')}
						/>
					</div>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<PhoneInput
								placeholder="Номер телефона"
								value={field.value}
								icon={<LuPhone />}
								error={Boolean(errors.phone)}
								errorMessage={errors.phone?.message}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>
					<Input
						type="password"
						placeholder="Пароль"
						icon={<LuLock />}
						error={Boolean(errors.password)}
						errorMessage={errors.password?.message}
						{...register('password')}
					/>
					<Input
						type="password"
						placeholder="Подтверждение пароля"
						icon={<LuLock />}
						error={Boolean(errors.confirmPass)}
						errorMessage={errors.confirmPass?.message}
						{...register('confirmPass')}
					/>
				</div>
			</div>
			<div className="pt-4 flex gap-2 justify-end">
				<Button isLoading={isLoading} type="submit">
					Зарегестрировать
				</Button>
				<Button btnType="outlined" onClick={(event) => handleCloseForm(event)}>
					Отмена
				</Button>
			</div>
		</form>
	);
};

export default AddUserForm;
