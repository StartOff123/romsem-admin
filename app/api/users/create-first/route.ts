import { Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { CreateUserDTO } from '@/lib/dto/create-user.dto';

export async function POST(req: Request) {
	try {
		const { password, ...data } = (await req.json()) as CreateUserDTO;
		const userValid = await db.user.findFirst({ where: { login: data.login } });
		if (userValid)
			return new NextResponse('Логин не уникален', { status: 400 });

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await db.user.create({
			data: {
				...data,
				passwordHash,
				role: Role.ADMIN,
				status: UserStatus.ACTIVE,
				avatar: null,
				description: null
			}
		});

		return NextResponse.json(user);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
