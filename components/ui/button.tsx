import classNames from 'classnames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonType = 'denger' | 'default' | 'outlined';

interface ButtonProps {
	btnType?: ButtonType;
	className?: string;
	isLoading?: boolean;
}

const Button = ({
	btnType = 'default',
	className,
	children,
	isLoading,
	disabled,
	...props
}: ButtonProps &
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>) => {
	return (
		<button
			{...props}
			className={classNames(
				className,
				'relative py-2 px-3 rounded text-sm transition min-w-[80px]',
				btnType === 'default' &&
					'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-500',
				btnType === 'denger' &&
					'bg-red-500 text-white hover:bg-red-600 active:bg-red-500',
				btnType === 'outlined' &&
					'bg-transparent text-zinc-500 border-[1px] border-zinc-300 hover:text-blue-500 hover:border-blue-500 active:border-blue-700 active:text-blue-700',
				(isLoading || disabled) && 'opacity-55 pointer-events-none'
			)}
			disabled={isLoading || disabled}
		>
			{isLoading ? (
				<div className="relative h-5">
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<AiOutlineLoading3Quarters
							size={20}
							className="animate-spin text-white"
						/>
					</div>
				</div>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
