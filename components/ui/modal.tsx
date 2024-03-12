import classNames from 'classnames';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
	isCloseBtn?: boolean;
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onChangeClose: () => void;
}

const Modal = ({
	children,
	isCloseBtn = true,
	isOpen,
	onChangeClose,
	className
}: ModalProps) => {
	return (
		<div className="absolute w-full h-full pointer-events-none overflow-hidden">
			<div
				className={classNames(
					'absolute flex flex-col top-1/2 gap-2 max-w-[500px] min-w-[200px] left-1/2 -translate-x-1/2 bg-white z-50 rounded overflow-hidden transition',
					isOpen
						? 'opacity-1 pointer-events-auto -translate-y-1/2'
						: 'opacity-0 pointer-events-none',
					className
				)}
			>
				{isCloseBtn && (
					<div className="flex justify-end hover:text-zinc-500 transition px-4 pt-4">
						<IoClose
							size={20}
							className="cursor-pointer"
							onClick={() => onChangeClose()}
						/>
					</div>
				)}
				<div>{children}</div>
			</div>
			<span
				className={classNames(
					'absolute z-40 w-full h-full bg-black top-0 left-0 transition',
					isOpen
						? 'opacity-30 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				)}
				onClick={() => onChangeClose()}
			/>
		</div>
	);
};

export default Modal;
