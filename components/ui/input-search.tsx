import classNames from 'classnames';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { LuSearch } from 'react-icons/lu';

interface InputSearchProps {
	className?: string;
	onChangeSearch: (value: string) => void;
}

const InputSearch = ({
	className,
	onChangeSearch,
	value,
	...props
}: InputSearchProps &
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>) => {
	const [focus, setFocus] = React.useState<boolean>(false);
	const [rootValue, setRootValue] = React.useState<
		string | number | readonly string[] | undefined
	>(value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRootValue(event.target.value);
		onChangeSearch(event.target.value);
	};

	const handleClear = () => {
		if (rootValue === '') return;
		setRootValue('');
		onChangeSearch('');
	};

	return (
		<div
			className={classNames(
				'relative w-full rounded transition border-[1px] flex items-center',
				focus
					? 'border-blue-500 shadow-[0px_0px_0px_2px_rgb(147,197,253)]'
					: 'border-zinc-300 hover:border-blue-500',
				className
			)}
		>
			<input
				{...props}
				value={rootValue}
				onChange={(event) => handleChange(event)}
				className="py-2 px-3 w-[300px] outline-none bg-transparent text-sm"
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
			<span
				className={classNames(
					'relative py-4 px-5 bg-blue-500 mr-0.5 transition rounded text-zinc-200 cursor-pointer overflow-hidden',
					rootValue === '' ? '' : 'hover:bg-red-500'
				)}
				onClick={() => handleClear()}
			>
				<span
					className={classNames(
						'absolute left-1/2 -translate-x-1/2 top-0 flex flex-col gap-2 transition',
						rootValue === '' ? 'translate-y-2' : '-translate-y-4'
					)}
				>
					<LuSearch />
					<IoClose />
				</span>
			</span>
		</div>
	);
};

export default InputSearch;
