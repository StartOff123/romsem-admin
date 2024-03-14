import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(req: Request) {
	try {
		const { date } = (await req.json()) as { date: string };

		const report = await db.order.findMany({
			where: {
				status: 'ISSUED',
				createdAt: {
					gte: new Date(`${date}-01-01`),
					lt: new Date(`${date + 1}-01-01`)
				}
			},
			include: {
				products: true
			}
		});

		return NextResponse.json(report);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
