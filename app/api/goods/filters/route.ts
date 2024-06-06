import { ProductType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
	try {
		const sort = req.nextUrl.searchParams.get('sort') as string;
		const type = req.nextUrl.searchParams.get('type') as string;
		const search = req.nextUrl.searchParams.get('search') as string;

		const goods = await db.product.findMany({
			where: {
				type: type !== 'null' ? (type as ProductType) : undefined,
				title: {
					contains: search !== '' ? search : undefined,
					mode: 'insensitive'
				}
			},
			orderBy: {
				price:
					sort !== 'null' && (sort === 'ASC' || sort === 'DESC')
						? sort === 'ASC'
							? 'asc'
							: 'desc'
						: undefined,
				title: sort !== 'null' && sort === 'alphabetically' ? 'asc' : undefined,
				popularity: sort !== 'null' && sort === 'popular' ? 'asc' : undefined
			}
		});

		return NextResponse.json(goods);
	} catch (error) {
		console.log('[FILTERS_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
