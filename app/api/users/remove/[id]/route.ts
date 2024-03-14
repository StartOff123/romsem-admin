import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import getSession from '@/utils/getSession';

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const user: User | null = await db.user.findUnique({
			where: { id: session.user.id as string }
		});
		if (user?.role !== 'ADMIN')
			return new NextResponse('Отказано в доступе', { status: 403 });

		const { recovery_key } = (await req.json()) as { recovery_key: string };

		const currentUser = await db.user.findUnique({ where: { id: params.id } });
		if (currentUser?.recovery_key !== recovery_key)
			return new NextResponse('Неверный ключ востановления', { status: 400 });

		await db.user.update({
			where: { id: params.id },
			data: {
				status: 'FIRED',
				login: randomUUID(),
				deletedAt: new Date().toISOString()
			}
		});

		return NextResponse.json(true);
	} catch (error) {
		console.log('[GET-ME_GET]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
