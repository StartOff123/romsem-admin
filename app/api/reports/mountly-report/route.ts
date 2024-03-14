import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(req: Request) {
	try {
		const { mount, year } = (await req.json()) as {
			mount: string;
			year: string;
		};
		const curretMount = Number(mount) < 10 ? `0${Number(mount) + 1}` :  Number(mount) + 1;
		const nextMount =
			Number(mount) < 10 ? `0${Number(mount) + 2}` : Number(mount) + 2;

		const report = await db.order.findMany({
			where: {
				status: 'ISSUED',
				createdAt: {
					gte: new Date(`${year}-${curretMount}-01`),
					lt: new Date(`${year}-${nextMount}-01`)
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
