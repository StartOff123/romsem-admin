import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuKeySquare } from 'react-icons/lu';

import { Button, Input } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';

import { removeUser } from '@/redux/slices/users-slice';

import { RemoveUserSchema, RemoveUserType } from '@/types/index';

const RemoveUserForm = ({
	onClose,
	id
}: {
	onClose: () => void;
	id: string;
}) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		clearErrors
	} = useForm<RemoveUserType>({
		resolver: zodResolver(RemoveUserSchema)
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		await axios
			.patch(`/api/users/remove/${id}`, values)
			.then(() => {
				dispatch(removeUser(id));
				toast.success('Сотрудник успешно уволен');
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
		reset();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-4 p-4">
				<Input
					placeholder="Ключ восстановление сотрудника"
					icon={<LuKeySquare />}
					error={Boolean(errors.recovery_key)}
					errorMessage={errors.recovery_key?.message}
					{...register('recovery_key')}
				/>
				<div className="flex gap-2 justify-end">
					<Button isLoading={isLoading} type="submit" btnType="denger">
						Уволить
					</Button>
					<Button
						btnType="outlined"
						onClick={(event) => handleCloseForm(event)}
					>
						Отмена
					</Button>
				</div>
			</div>
		</form>
	);
};

export default RemoveUserForm;
