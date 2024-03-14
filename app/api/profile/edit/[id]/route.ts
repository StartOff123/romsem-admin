import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import { EditProfileType } from '@/types/index';

import getSession from '@/utils/getSession';

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const data = (await req.json()) as EditProfileType;

		const user: User = await db.user.update({
			where: { id: params.id },
			data: data
		});
		const { passwordHash, ...otherdata } = user;

		return NextResponse.json(otherdata);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
