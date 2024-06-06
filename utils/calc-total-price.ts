import { Product } from '@/types/index';

export const calcTotalPrice = (arr: Product[] | null | undefined): number => {
	if (!arr) return 0;

	const totalPrice = arr.reduce((sum, item) => sum + Number(item.price), 0);

	return totalPrice;
};
