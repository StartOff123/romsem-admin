import { create } from 'zustand';

import { Order, Product } from '@/types/index';

export type ModalType =
	| 'confirmation'
	| 'adding-product'
	| 'update-product'
	| 'adding-user'
	| 'remove-user'
	| 'show-product'
	| 'view-order';

interface IСonfirmationmData {
	children: React.ReactNode;
	confirmBtnText: string;
	onConfirm: () => void;
}

interface ModalData {
	сonfirmationmData?: IСonfirmationmData;
	children?: React.ReactNode;
	productData?: Product;
	orderData?: Order;
}

interface ModalStore {
	type: ModalType | null;
	data: ModalData;
	isOpen: boolean;
	onOpen: (type: ModalType, data?: ModalData) => void;
	onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ type: null, isOpen: false })
}));
