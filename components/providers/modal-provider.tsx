'use client';

import React from 'react';

import AddProductModal from '@/modals/add-product-modal';
import AddUserModal from '@/modals/add-user-modal';
import ConfirmModal from '@/modals/confirm-modal';
import RemoveUserModal from '@/modals/remove-user-modal';
import ShowProductModal from '@/modals/show-prodict-modal';
import UpdateProductModal from '@/modals/update-product-modal';
import ViewOrderModal from '@/modals/view-order-modal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<>
			<ConfirmModal />
			<AddUserModal />
			<ViewOrderModal />
			<AddProductModal />
			<RemoveUserModal />
			<ShowProductModal />
			<UpdateProductModal />
		</>
	);
};
