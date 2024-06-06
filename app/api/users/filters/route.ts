import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
	try {
		const role = req.nextUrl.searchParams.get('role') as string;
		const search = req.nextUrl.searchParams.get('search') as string;

		const users = await db.user.findMany({
			where: {
				role: role !== 'null' ? (role as Role) : undefined,
				firstName: {
					contains: search !== '' ? search : undefined,
					mode: 'insensitive'
				},
				lastName: {
					contains: search !== '' ? search : undefined,
					mode: 'insensitive'
				},
				surname: {
					contains: search !== '' ? search : undefined,
					mode: 'insensitive'
				},
				id: {
					contains: search !== '' ? search : undefined,
					mode: 'insensitive'
				}
			}
		});

		return NextResponse.json(users);
	} catch (error) {
		console.log('[FILTERS_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
