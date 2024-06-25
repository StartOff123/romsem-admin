import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
	try {
		const products = req.nextUrl.searchParams.get('products') as string;

		const orders = await db.order.findMany({
			include: {
				products: Boolean(products)
			}
		});

		return NextResponse.json(orders);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
