import React from 'react';

import { Modal } from '@/ui/index';

import { useModal } from '@/hooks/use-modal-store';

const RemoveUserModal = () => {
	const { isOpen, onClose, data, type } = useModal();
	const { children } = data;

	const isModalOpen = isOpen && type === 'remove-user';

	return (
		<Modal
			isOpen={isModalOpen}
			onChangeClose={onClose}
			isCloseBtn={false}
			className="w-[500px]"
		>
			<div className="grid gap-2">
				<div className="flex bg-[#202B46] p-4 gap-4 items-center justify-center">
					<h1 className="text-white relative text-xl font-semibold">
						Вы точно хотите уволить сотрудника?
					</h1>
				</div>
				<div className="px-4 relative pb-4 text-center">
					<p className="text-sm text-zinc-400">
						После удаление он больше не сможет зайти в систему, а аккаунт будет
						невозможно восстановить.
					</p>
					<span className="absolute w-20 h-[2px] bg-zinc-300 bottom-0 left-1/2 -translate-x-1/2 rounded-sm" />
				</div>
			</div>
			{children}
		</Modal>
	);
};

export default RemoveUserModal;
