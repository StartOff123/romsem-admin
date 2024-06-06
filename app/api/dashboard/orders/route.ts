import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
	try {
		const date = new Date();

		const day =
			String(date.getDate()).length === 1
				? `0${date.getDate()}`
				: `${date.getDate()}`;
		const mount =
			String(date.getMonth() + 1).length === 1
				? `0${date.getMonth() + 1}`
				: `${date.getMonth() + 1}`;

		const orders = await db.order.findMany({
			where: {
				status: 'ISSUED',
				createdAt: {
					gte: new Date(`${date.getFullYear()}-${mount}-${day} 00:00`),
					lt: new Date(`${date.getFullYear()}-${mount}-${day} 23:59`)
				}
			},
			include: {
				products: true
			}
		});

		return NextResponse.json(orders);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
