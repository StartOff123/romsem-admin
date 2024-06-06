import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(
	_: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const order = await db.order.findUnique({
			where: {
				id: Number(params.id)
			},
			include: {
				products: true
			}
		});

		if (!order) return new NextResponse('Not Found', { status: 404 });

		return NextResponse.json(order);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
