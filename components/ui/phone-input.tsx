import { useMask } from '@react-input/mask';
import classNames from 'classnames';
import React from 'react';
import { PiWarningCircle } from 'react-icons/pi';

interface InputProps {
	className?: string;
	error?: boolean;
	errorMessage?: string;
	icon?: React.ReactNode;
	value: string | undefined;
	onChange: (value: string | undefined) => void;
}

const PhoneInput = ({
	className,
	error,
	errorMessage,
	icon,
	value,
	onChange,
	...props
}: InputProps &
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>) => {
	const ref = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });

	const [focus, setFocus] = React.useState<boolean>(false);

	return (
		<div
			className={classNames(
				'relative w-full rounded transition border-[1px] flex items-center',
				focus
					? error
						? 'border-red-500 shadow-[0px_0px_0px_2px_rgb(252,165,165)]'
						: 'border-blue-500 shadow-[0px_0px_0px_2px_rgb(147,197,253)]'
					: error
						? 'border-red-500'
						: 'border-zinc-300 hover:border-blue-500',
				className
			)}
		>
			{icon && (
				<span
					className={classNames(
						'px-2 transition relative h-full flex items-center before:absolute before:w-[1px] before:h-2/3 before:bg-zinc-300 before:left-full before:transition',
						focus
							? error
								? 'text-red-500'
								: 'text-blue-500 before:bg-blue-500'
							: error
								? 'text-red-500'
								: 'text-zinc-400'
					)}
				>
					{icon}
				</span>
			)}
			<input
				ref={ref}
				{...props}
				value={value}
				onChange={({ target }) => onChange(target.value)}
				className={classNames(
					'py-2 w-full outline-none bg-transparent text-sm',
					!icon ? 'px-3' : 'pl-2'
				)}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
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

export default PhoneInput;
