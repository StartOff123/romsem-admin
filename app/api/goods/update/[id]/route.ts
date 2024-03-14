import { Product, ProductType, User } from '@prisma/client';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import { Product as RoopProduct } from '@/types/index';

import getSession from '@/utils/getSession';

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const user: User | null = await db.user.findUnique({
			where: { id: session.user.id as string }
		});
		if (user?.role !== 'ADMIN')
			return new NextResponse('Отказано в доступе', { status: 403 });

		const data = (await req.json()) as RoopProduct;

		const product: Product = await db.product.update({
			where: { id: params.id },
			data: {
				title: data.title,
				description: data.description,
				price: Number(data.price),
				type: data.type as ProductType,
				details: JSON.stringify(data.details),
				compound: data.compound as string[],
				image: data.image as string
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
