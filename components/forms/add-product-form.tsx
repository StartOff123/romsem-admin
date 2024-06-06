'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdDriveFileRenameOutline } from 'react-icons/md';

import { Button, Input, InputTags, Select, Textarea, Upload } from '@/ui/index';

import { useAppDispatch } from '@/hooks/redux-hooks';

import { CreateProductDTO } from '@/lib/dto/create-product.dto';

import { addProduct } from '@/redux/slices/goods-slice';

import { productTypeFilter } from '@/settings/goods';

import { Product, ProductFormType, ProductSchema } from '@/types/index';

const AddProductForm = ({ onClose }: { onClose: () => void }) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [rootType, setRootType] = React.useState<ProductType | undefined>(
		undefined
	);

	const {
		register,
		watch,
		handleSubmit,
		control,
		reset,
		formState: { errors },
		clearErrors
	} = useForm<ProductFormType>({
		resolver: zodResolver(ProductSchema)
	});

	const onSubmit = handleSubmit(async (values) => {
		setIsLoading(true);

		const { price, ...otherData } = values;

		const data: CreateProductDTO = {
			...otherData,
			price: Number(price)
		};

		await axios
			.post('/api/goods/create', data)
			.then((response) => {
				dispatch(addProduct(response.data as Product));
				toast.success('Товар успешно добавлен');
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

	React.useEffect(() => {
		watch((values) => setRootType(values.type));
	}, [watch]);

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-1 p-4">
			<div className="flex flex-col gap-6">
				<div className="flex gap-4">
					<Controller
						name="image"
						control={control}
						render={({ field }) => (
							<Upload
								endpoint="productImage"
								value={field.value}
								error={Boolean(errors.image)}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>
					<div className="flex flex-1 flex-col gap-6">
						<Input
							placeholder="Наименование"
							icon={<MdDriveFileRenameOutline />}
							error={Boolean(errors.title)}
							errorMessage={errors.title?.message}
							{...register('title')}
						/>
						<Input
							placeholder="Цена"
							type="number"
							icon={<p className="text-sm">₽</p>}
							error={Boolean(errors.price)}
							errorMessage={errors.price?.message}
							{...register('price')}
						/>
						<p className="text-xs text-zinc-400">
							Рекомендуемое разрешение для изображения 1200x1200. Так оно будет
							отображаться максимально корректно.
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<Controller
						name="compound"
						control={control}
						render={({ field }) => (
							<InputTags
								placeholder="Cостав"
								error={Boolean(errors.compound)}
								value={field.value}
								errorMessage={
									Boolean(errors.compound) ? 'Обязательное поле' : undefined
								}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								options={productTypeFilter}
								placeholder="Тип товара"
								error={Boolean(errors.type)}
								errorMessage={errors.type?.message}
								value={field.value}
								onChange={(value) => field.onChange(value)}
							/>
						)}
					/>
				</div>
				{rootType && (
					<div>
						{rootType === 'BEVERAGES' || rootType === 'WOK' ? (
							rootType === 'BEVERAGES' ? (
								<Input
									placeholder="Объем"
									type="number"
									icon={<p className="text-sm">мл</p>}
									error={Boolean(errors.details?.volume)}
									errorMessage={errors.details?.volume?.message}
									{...register('details.volume')}
								/>
							) : (
								<Input
									placeholder="Вес"
									type="number"
									icon={<p className="text-sm">гр</p>}
									error={Boolean(errors.details?.volume)}
									errorMessage={errors.details?.volume?.message}
									{...register('details.volume')}
								/>
							)
						) : (
							<div className="grid grid-cols-2 gap-4">
								<Input
									placeholder="Вес"
									type="number"
									icon={<p className="text-sm">гр</p>}
									error={Boolean(errors.details?.volume)}
									errorMessage={errors.details?.volume?.message}
									{...register('details.volume')}
								/>
								{rootType === 'PIZZA' ? (
									<Input
										placeholder="Диаметр"
										type="number"
										icon={<p className="text-sm">см</p>}
										error={Boolean(errors.details?.size)}
										errorMessage={errors.details?.size?.message}
										{...register('details.size')}
									/>
								) : (
									<Input
										placeholder="Кол-во кусочков"
										type="number"
										icon={<p className="text-sm">шт</p>}
										error={Boolean(errors.details?.pieces)}
										errorMessage={errors.details?.pieces?.message}
										{...register('details.pieces')}
									/>
								)}
							</div>
						)}
					</div>
				)}
				<Textarea
					placeholder="Описание"
					defaultRows={3}
					error={Boolean(errors.description)}
					errorMessage={errors.description?.message}
					{...register('description')}
				/>
			</div>
			<div className="pt-4 flex gap-2 justify-end">
				<Button isLoading={isLoading} type="submit">
					Добавить
				</Button>
				<Button btnType="outlined" onClick={(event) => handleCloseForm(event)}>
					Отмена
				</Button>
			</div>
		</form>
	);
};

export default AddProductForm;
