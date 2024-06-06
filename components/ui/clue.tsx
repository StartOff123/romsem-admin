import classNames from 'classnames';
import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

type PositionType = 'top' | 'left' | 'right' | 'bottom';

interface ClueProps {
	children: React.ReactNode;
	clueText: string;
	position?: PositionType;
}

const Clue = ({ children, clueText, position = 'top' }: ClueProps) => {
	const [hover, setHover] = React.useState<boolean>(false);

	return (
		<div className="relative">
			<span
				className={classNames(
					'absolute text-xs text-white z-20 bg-[#202B46] w-max transition px-2 py-1 rounded-md',
					position === 'top' &&
						'bottom-full left-1/2 -translate-x-1/2 -translate-y-2',
					position === 'bottom' &&
						'top-full left-1/2 -translate-x-1/2 translate-y-2',
					position === 'left' &&
						'right-full top-1/2 -translate-y-1/2 -translate-x-2',
					position === 'right' &&
						'left-full top-1/2 -translate-y-1/2 translate-x-2',
					hover
						? 'opacity-1 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				)}
			>
				{clueText}
				<IoMdArrowDropdown
					className={classNames(
						'absolute text-[#202B46]',
						position === 'top' &&
							'top-full left-1/2 -translate-x-1/2 -translate-y-2',
						position === 'bottom' &&
							'bottom-full left-1/2 -translate-x-1/2 translate-y-2 rotate-180',
						position === 'left' &&
							'left-full top-1/2 -translate-y-1/2 -translate-x-2 -rotate-90',
						position === 'right' &&
							'right-full top-1/2 -translate-y-1/2 translate-x-2 rotate-90'
					)}
					size={20}
				/>
			</span>
			<div
				onMouseMove={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{children}
			</div>
		</div>
	);
};

export default Clue;
