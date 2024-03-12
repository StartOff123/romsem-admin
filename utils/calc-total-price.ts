import { Product } from '@/types/index';

import { numberWithSpaces } from './number-with-spaces';

export const calcTotalPrice = (
	arr: Product[] | null | undefined
): number | string => {
	if (!arr) return 0;

	const totalPrice = arr.reduce((sum, item) => sum + Number(item.price), 0);

	return numberWithSpaces(totalPrice);
};
