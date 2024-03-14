import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import getSession from '@/utils/getSession';

export async function GET() {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const users = (await db.user.findMany()).map((user) => {
			return {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				surname: user.surname,
				role: user.role,
				status: user.status,
				avatar: user.avatar,
				description: user.description,
				login: user.login,
				phone: user.phone,
				createdAt: user.createdAt,
				deletedAt: user.deletedAt
			};
		});

		return NextResponse.json(users);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
