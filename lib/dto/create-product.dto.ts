import { ProductType } from '@prisma/client';

export interface CreateProductDTO {
	title: string;
	description: string;
	type: ProductType;
	price: number;
	details: Object;
	compound: string[];
	image: string;
}
