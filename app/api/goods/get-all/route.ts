import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const goods = await db.product.findMany();

		return NextResponse.json(
			goods.map((item) => {
				const { details, price, ...data } = item;

				return {
					...data,
					price: String(price),
					details: JSON.parse(details as string)
				};
			})
		);
	} catch (error) {
		console.log('[ALL_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
