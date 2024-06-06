import classNames from 'classnames';
import React from 'react';
import { PiWarningCircle } from 'react-icons/pi';

interface TextareaProps {
	className?: string;
	defaultRows?: number;
	error?: boolean;
	errorMessage?: string;
}

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	TextareaProps &
		React.DetailedHTMLProps<
			React.TextareaHTMLAttributes<HTMLTextAreaElement>,
			HTMLTextAreaElement
		>
>(
	(
		{ className, defaultRows = 2, value, error, errorMessage, ...props },
		ref
	) => {
		return (
			<div className={classNames('relative w-full', className)}>
				<textarea
					{...props}
					ref={ref}
					style={{ height: defaultRows * 32 }}
					className={classNames(
						'bg-transparent resize-none overflow-hidden outline-none py-2 px-3 border-[1px] transition w-full text-sm rounded',
						error
							? 'border-red-500 hover:border-red-500 focus:shadow-[0px_0px_0px_2px_rgb(252,165,165)]'
							: 'border-zinc-300 hover:border-blue-500 focus:shadow-[0px_0px_0px_2px_rgb(147,197,253)]'
					)}
				/>
				{errorMessage && (
					<p className="absolute top-full text-xs flex gap-0.5 items-center text-red-500 -translate-y-1">
						<PiWarningCircle size={13} />
						{errorMessage}
					</p>
				)}
			</div>
		);
	}
);

Textarea.displayName = 'Textarea';

export default Textarea;
