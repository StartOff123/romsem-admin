'use client';

import axios, { AxiosError } from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { ImageLoader } from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegTrashCan } from 'react-icons/fa6';
import { LuHardDriveUpload } from 'react-icons/lu';
import { PiWarningCircle } from 'react-icons/pi';

interface UploadImageProps {
	value: string | undefined | null;
	onChange: (value: string | undefined) => void;
	uploadDir: string;
	size?: number;
	error?: boolean;
	errorMessage?: string;
	className?: string;
}

const UploadImage = ({
	size,
	onChange,
	value,
	error,
	errorMessage,
	uploadDir,
	className
}: UploadImageProps) => {
	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [selectImage, setSelectImage] = React.useState<
		string | undefined | null
	>(value);

	const handleUploadImage = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files) {
			setIsUploading(true);
			const file = event.target.files[0];

			const formData = new FormData();
			formData.set('image', file);

			await axios
				.post(`/api/upload/${uploadDir}`, formData)
				.then((response) => {
					if (response.data.imageName) {
						setSelectImage(response.data.imageName);
						onChange(response.data.imageName);
					}
				})
				.catch((err: AxiosError) => {
					toast.error(err.response?.data as string);
				})
				.finally(() => setIsUploading(false));
		}
	};

	const imageLoager: ImageLoader = ({ src, width }) => {
		return `/uploads/${uploadDir}/${src}?w=${width}`;
	};

	const removeImage = () => {
		setSelectImage(undefined);
		onChange('');
	};

	React.useEffect(() => {
		if (value) setSelectImage(value);
	}, [value]);

	return (
		<div className="relative">
			<label
				style={{ width: size, height: size }}
				className={classNames(
					className,
					'relative flex items-center justify-center border-[1px] rounded transition overflow-hidden',
					error
						? 'border-red-500 border-dashed cursor-pointer hover:shadow-[0px_0px_0px_2px_rgb(252,165,165)]'
						: selectImage
							? 'border-zinc-300 border-solid pointer-events-none'
							: 'border-dashed border-zinc-400 hover:border-blue-500 hover:shadow-[0px_0px_0px_2px_rgb(147,197,253)] cursor-pointer'
				)}
			>
				{selectImage ? (
					<Image
						loader={imageLoager}
						src={selectImage}
						width={size}
						height={size}
						alt="image"
					/>
				) : (
					<>
						<span
							className={classNames(
								'text-sm text-zinc-400 flex flex-col items-center gap-2',
								isUploading && 'blur-sm'
							)}
						>
							<p className="text-center">Загрузить изображение</p>
							<LuHardDriveUpload size={25} />
						</span>
						<input
							type="file"
							accept="image/png, image/jpeg"
							hidden
							onChange={handleUploadImage}
						/>
					</>
				)}
			</label>
			{isUploading ? (
				<span
					className={classNames(
						className,
						'absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 text-white flex items-center justify-center rounded'
					)}
				>
					<AiOutlineLoading3Quarters size={25} className="animate-spin" />
				</span>
			) : (
				selectImage && (
					<span
						className="absolute top-0 right-0 text-white p-2 bg-red-500 rounded-bl rounded-tr cursor-pointer hover:bg-red-600 transition"
						onClick={removeImage}
					>
						<FaRegTrashCan />
					</span>
				)
			)}
			<p
				className={classNames(
					'absolute top-full text-xs flex gap-0.5 items-center text-red-500 transition-all',
					errorMessage
						? 'opacity-1 pointer-events-auto translate-y-1'
						: 'opacity-0 pointer-events-none translate-y-4'
				)}
			>
				<PiWarningCircle size={13} />
				{errorMessage}
			</p>
		</div>
	);
};

export default UploadImage;
