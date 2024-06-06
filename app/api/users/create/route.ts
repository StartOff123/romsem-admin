import { User, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CreateUserDTO } from '@/lib/dto/create-user.dto';

import getSession from '@/utils/getSession';

export async function POST(req: Request) {
	try {
		const session = (await getSession()) as Session;
		if (!session?.user?.id)
			return new NextResponse('Не авторизован', { status: 401 });

		const user: User | null = await db.user.findUnique({
			where: { id: session.user.id as string }
		});
		if (user?.role !== 'ADMIN')
			return new NextResponse('Отказано в доступе', { status: 403 });

		const { password, role, ...data } = (await req.json()) as CreateUserDTO;

		const userValid = await db.user.findFirst({ where: { login: data.login } });
		if (userValid)
			return new NextResponse('Логин не уникален', { status: 400 });

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				...data,
				role: role!,
				passwordHash,
				status: UserStatus.ACTIVE,
				avatar: null,
				description: null
			}
		});

		return NextResponse.json(newUser);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
