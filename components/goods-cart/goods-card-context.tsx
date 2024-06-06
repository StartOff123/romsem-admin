import axios from 'axios';
import classNames from 'classnames';
import React from 'react';
import toast from 'react-hot-toast';
import { FaEllipsisH, FaExternalLinkAlt, FaRegTrashAlt } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

import UpdateProductForm from '@/forms/update-product-form';

import { IItems } from '@/ui/dropdown';

import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { useModal } from '@/hooks/use-modal-store';

import { removeProduct } from '@/redux/slices/goods-slice';

import { Product } from '@/types/index';

const GoodsCardContext = ({ product }: { product: Product }) => {
	const dispatch = useAppDispatch();
	const { onOpen, onClose } = useModal();
	const { profile } = useAppSelector((state) => state.profileSlice);

	const contextRef = React.useRef<HTMLDivElement>(null);
	const [contextIsOpen, setContextIsOpen] = React.useState<boolean>(false);

	const contextMenuItems: IItems[] = [
		{
			key: '1',
			access: 'full',
			label: (
				<div className="flex items-center gap-2 hover:text-sky-500 transition">
					<FaExternalLinkAlt />
					<p>Показать на сайте</p>
				</div>
			)
		},
		{
			key: '2',
			access: 'ADMIN',
			onClick: () =>
				onOpen('update-product', {
					productData: { ...product },
					children: <UpdateProductForm onClose={onClose} />
				}),
			label: (
				<div className="flex items-center gap-2 hover:text-sky-500 transition">
					<IoSettingsOutline />
					<p>Изменить</p>
				</div>
			)
		},
		{
			key: '3',
			access: 'ADMIN',
			onClick: () =>
				onOpen('confirmation', {
					сonfirmationmData: {
						children: (
							<div>
								<h1 className="font-bold text-lg">
									Удалить товар «‎{product.title}»‎?
								</h1>
								<p className="text-sm text-zinc-400">
									После удаление данный товар невозможно будет восстановить.
									Также он перестанет отображаться на сайте.
								</p>
							</div>
						),
						confirmBtnText: 'Удалить',
						onConfirm: () => remove()
					}
				}),
			label: (
				<div className="flex items-center gap-2 hover:text-red-500 transition">
					<FaRegTrashAlt />
					<p>Удалить</p>
				</div>
			)
		}
	];

	const remove = async () => {
		await axios
			.delete(`/api/goods/remove/${product.id}`)
			.then(() => {
				toast.success('Товар был успешно удален');
				dispatch(removeProduct(product.id!));
				onClose();
			})
			.catch(() => toast.error('Не удалось удалить товар'));
	};

	React.useEffect(() => {
		const handleClickOutside = (event: any) =>
			contextRef.current?.contains(event.target) || setContextIsOpen(false);
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div
			ref={contextRef}
			className="absolute right-0 cursor-pointer w-6 h-6 top-0"
		>
			<div
				className={classNames(
					'text-white flex items-center justify-center h-full transition',
					contextIsOpen
						? ' bg-blue-500 rounded-bl-none'
						: 'bg-zinc-300 hover:bg-blue-500 rounded-bl'
				)}
				onClick={() => setContextIsOpen(!contextIsOpen)}
			>
				<FaEllipsisH />
			</div>
			<div
				className={classNames(
					'absolute bg-white w-[180px] px-3 py-1 -right-[1px] border-[1px] border-zinc-300 rounded-tl rounded-bl rounded-br-md shadow-lg z-30 transition',
					contextIsOpen
						? 'opacity-1 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				)}
			>
				{contextMenuItems.map((item) => (
					<div
						key={item.key}
						className={classNames(
							'text-sm py-1',
							item.access === 'full' && '!block',
							item.access !== 'ADMIN' && 'hidden'
						)}
						onClick={item.onClick}
					>
						{item.label}
					</div>
				))}
			</div>
		</div>
	);
};

export default GoodsCardContext;
