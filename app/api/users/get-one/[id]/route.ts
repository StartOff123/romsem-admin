import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import getSession from '@/utils/getSession';

export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		return NextResponse.json(
			await db.user.findUnique({ where: { id: params.id } })
		);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
