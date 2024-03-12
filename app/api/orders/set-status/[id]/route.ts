import { OrderStatus } from '@prisma/client';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { status } = (await req.json()) as { status: OrderStatus };

		const order = await db.order.update({
			where: { id: Number(params.id) },
			data: { status: status }
		});

		return NextResponse.json(order);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
