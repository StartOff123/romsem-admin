'use client';

import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

import { Button, Modal } from '@/ui/index';

import { useModal } from '@/hooks/use-modal-store';

const ConfirmModal = () => {
	const { isOpen, onClose, data, type } = useModal();
	const { сonfirmationmData } = data;

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const isModalOpen = isOpen && type === 'confirmation';

	const onConfirm = () => {
		setIsLoading(true);
		сonfirmationmData?.onConfirm();
		setIsLoading(false);
	};

	return (
		<Modal isOpen={isModalOpen} onChangeClose={onClose} isCloseBtn={false}>
			<div className="flex gap-8 p-4">
				<span className="text-red-300 flex items-center border-[1px] border-red-300 rounded px-4 relative before:absolute before:w-[1px] before:h-full before:bg-zinc-400 before:-right-4">
					<IoWarningOutline size={70} />
				</span>
				<div className="flex flex-col justify-between gap-2">
					{сonfirmationmData?.children}
					<div className="flex gap-2 justify-end">
						<Button isLoading={isLoading} btnType="denger" onClick={onConfirm}>
							{сonfirmationmData?.confirmBtnText}
						</Button>
						<Button btnType="outlined" onClick={() => onClose()}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
