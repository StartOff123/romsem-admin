import classNames from 'classnames';
import React from 'react';
import { PiWarningCircle } from 'react-icons/pi';

interface InputTagsProps {
	className?: string;
	placeholder?: string;
	error?: boolean;
	errorMessage?: string;
	onChange?: (tags: string[]) => void;
	value?: string[] | undefined;
}

const InputTags = ({
	className,
	placeholder,
	onChange,
	value,
	error,
	errorMessage
}: InputTagsProps) => {
	const [focus, setFocus] = React.useState<boolean>(false);

	const [tag, setTag] = React.useState<string>('');
	const [tags, setTags] = React.useState<string[] | undefined>(value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setTag(value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = event;

		if (
			(key === ',' || key === 'Enter' || key === 'Tab') &&
			tag.trim().length &&
			!tags?.includes(tag.trim())
		) {
			event.preventDefault();

			tag
				.trim()
				.split(';')
				.forEach((value) => {
					const newTag = value.trim();

					setTags((prevTags) => {
						const latestTags = [...prevTags!, newTag];

						onChange?.(latestTags);
						return latestTags;
					});
				});
			setTag('');
		} else if (key === 'Backspace' && !tag.trim().length && tags?.length) {
			event.preventDefault();
			const tagsCopy = [...tags];
			const lastTag = tagsCopy.pop() as string;

			setTags(tagsCopy);
			onChange?.(tagsCopy);
			setTag(lastTag);
		}
	};

	const removeTag = (index: number) => {
		setTags((prevTags) => {
			const latestTags = prevTags?.filter((_, i) => i !== index);

			onChange?.(latestTags!);
			return latestTags;
		});
	};

	React.useEffect(() => {
		if (value) setTags(value);
		else setTags([]);
	}, [value]);

	return (
		<div className={classNames('relative', className)}>
			<div
				className={classNames(
					'bg-transparent outline-none py-2 px-3 border-[1px] rounded transition w-full',
					focus
						? error
							? 'border-red-500 shadow-[0px_0px_0px_2px_rgb(252,165,165)]'
							: 'border-blue-500 shadow-[0px_0px_0px_2px_rgb(147,197,253)]'
						: error
							? 'border-red-500'
							: 'border-zinc-300 hover:border-blue-500'
				)}
			>
				<div className="max-h-[80px] overflow-hidden">
					<div className="overflow-auto flex flex-wrap gap-1 max-h-[80px]">
						{tags?.length || tag ? (
							tags?.map((item, i) => (
								<div
									key={i}
									className="text-xs px-2 bg-blue-500 text-white p-0.5 rounded-sm cursor-pointer hover:bg-red-400 transition"
									onClick={() => removeTag(i)}
								>
									{item}
								</div>
							))
						) : (
							<span className="text-sm text-zinc-400 pointer-events-none absolute">
								{placeholder}
							</span>
						)}
						<div className="relative box-border h-[20px] inline-block grow text-ellipsis overflow-hidden px-2">
							<span className="whitespace-pre h-full inline-block box-border select-none align-top text-transparent">
								{tag}
							</span>
							<input
								className="h-full text-ellipsis bg-transparent text-sm top-0 left-0 box-border w-full outline-none border-none absolute"
								value={tag}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								onFocus={() => setFocus(true)}
								onBlur={() => setFocus(false)}
							/>
						</div>
					</div>
				</div>
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

export default InputTags;
