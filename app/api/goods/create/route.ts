import { Product, User } from '@prisma/client';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CreateProductDTO } from '@/lib/dto/create-product.dto';

import getSession from '@/utils/getSession';

export async function POST(req: Request) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const user: User | null = await db.user.findUnique({
			where: { id: session.user.id as string }
		});
		if (user?.role !== 'ADMIN')
			return new NextResponse('Отказано в доступе', { status: 403 });

		const data = (await req.json()) as CreateProductDTO;

		const product: Product = await db.product.create({
			data: {
				title: data.title,
				description: data.description,
				price: data.price,
				type: data.type,
				details: JSON.stringify(data.details),
				compound: data.compound,
				image: data.image
			}
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
