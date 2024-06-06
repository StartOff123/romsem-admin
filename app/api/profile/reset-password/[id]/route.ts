import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import { ResetPasswordType } from '@/types/index';

import getSession from '@/utils/getSession';

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Неавторизован', { status: 401 });

		const data = (await req.json()) as ResetPasswordType;

		const user: User | null = await db.user.findUnique({
			where: { id: params.id }
		});
		if (!user)
			return new NextResponse('Пользователь не найден', { status: 400 });

		const isCorrectPassword = await bcrypt.compare(
			data.currentPassword,
			user.passwordHash
		);
		if (!isCorrectPassword)
			return new NextResponse('Введен невеный текуший пароль', { status: 400 });

		const passwordHashed = await bcrypt.hash(data.password, 10);

		const updateUser: User = await db.user.update({
			where: { id: params.id },
			data: { passwordHash: passwordHashed }
		});
		const { passwordHash, ...otherdata } = updateUser;

		return NextResponse.json(otherdata);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
