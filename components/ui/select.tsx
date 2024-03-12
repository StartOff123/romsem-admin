'use client';

import classNames from 'classnames';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { PiWarningCircle } from 'react-icons/pi';

export interface SelectOptions {
	title: string;
	value: string;
	icon: React.ReactNode;
}

interface SelectProps {
	className?: string;
	placeholder?: string;
	error?: boolean;
	errorMessage?: string;
	options: SelectOptions[];
	onChange: (value: string | null) => void;
	value: string | null;
}

const Select = ({
	options,
	onChange,
	placeholder,
	className,
	value,
	error,
	errorMessage
}: SelectProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	const [showOptions, setShowOptions] = React.useState<boolean>(false);
	const [currentOption, setCurrentOption] = React.useState<
		SelectOptions | undefined
	>(options.filter((item) => item.value === value)[0]);

	const handleSelectOption = (option: SelectOptions) => {
		setCurrentOption(option);
		setShowOptions(false);
		onChange(option.value);
	};

	const clearSelect = () => {
		setCurrentOption(undefined);
		setShowOptions(false);
		onChange(null);
	};

	React.useEffect(() => {
		const handleClickOutside = (event: any) =>
			ref.current?.contains(event.target) || setShowOptions(false);
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div ref={ref} className={classNames('relative min-w-[170px]', className)}>
			<div
				className={classNames(
					'py-2 pr-2 relative w-full rounded transition border-[1px] flex items-center text-sm cursor-pointer',
					currentOption ? 'pl-2' : 'pl-3',
					showOptions
						? error
							? 'border-red-500 shadow-[0px_0px_0px_2px_rgb(252,165,165)]'
							: 'border-blue-500 shadow-[0px_0px_0px_2px_rgb(147,197,253)]'
						: error
							? 'border-red-500'
							: 'border-zinc-300 hover:border-blue-500'
				)}
				onClick={() => setShowOptions(!showOptions)}
			>
				<div className="flex-1">
					{currentOption ? (
						<span className="flex items-center gap-2">
							{currentOption.icon}
							<p className="text-sm">{currentOption.title}</p>
						</span>
					) : (
						<span className="text-zinc-400">{placeholder}</span>
					)}
				</div>

				<div
					className={classNames(
						'text-zinc-400 transition',
						currentOption
							? 'hover:text-blue-500 cursor-pointer'
							: showOptions && 'rotate-180'
					)}
					onClick={() => currentOption && clearSelect()}
				>
					{currentOption ? <IoMdClose /> : <MdOutlineKeyboardArrowDown />}
				</div>
			</div>

			<div
				className={classNames(
					'transition bg-white z-30 shadow-lg w-full border-[1px] border-zinc-300 rounded absolute py-2',
					showOptions
						? 'opacity-1 pointer-events-auto translate-y-1'
						: 'opacity-0 pointer-events-none translate-y-4'
				)}
			>
				{options.map((item) => (
					<div
						key={item.value}
						className="px-3 py-0.5 text-sm hover:text-blue-500 transition cursor-pointer flex items-center gap-1"
						onClick={() => handleSelectOption(item)}
					>
						{item.icon}
						<p>{item.title}</p>
					</div>
				))}
			</div>
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

export default Select;
