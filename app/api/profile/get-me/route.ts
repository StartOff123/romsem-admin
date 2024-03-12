import { User } from '@prisma/client';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import getSession from '@/utils/getSession';

export async function GET() {
	try {
		const session = await getSession();
		// @ts-ignore
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const user: User | null = await db.user.findUnique({
			// @ts-ignore
			where: { id: session.user.id as string }
		});
		if (!user) return new NextResponse('Неавторизован', { status: 401 });

		const { passwordHash, ...data } = user;

		return NextResponse.json(data);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
