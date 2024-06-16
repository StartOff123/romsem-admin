import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(
	_: NextRequest,
	{ params }: { params: { status: string } }
) {
	try {
		const orders = await db.order.findMany({
			where: {
				status: params.status as OrderStatus
			},
			include: {
				products: true
			}
		});

		return NextResponse.json(orders);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
