import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(req: Request) {
	try {
		const data = (await req.json()) as { searchString: string };

		const goods = await db.product.findMany({
			where: {
				title: {
					contains: data.searchString,
					mode: 'insensitive'
				}
			},
			select: {
				id: true,
				title: true,
				image: true,
				price: true
			}
		});

		return NextResponse.json(goods);
	} catch (error) {
		console.log('[REMOVE_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
