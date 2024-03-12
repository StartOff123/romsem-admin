import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import { RecoveryResetPasswordType } from '@/types/index';

export async function PATCH(req: Request) {
	try {
		const data = (await req.json()) as RecoveryResetPasswordType & {
			login: string;
		};

		const user = await db.user.findUnique({ where: { login: data.login } });
		if (!user)
			return new NextResponse('Ошибка при выполнении действия', {
				status: 400
			});

		const passwordHash = await bcrypt.hash(data.password, 10);

		await db.user.update({
			where: { login: data.login },
			data: { passwordHash }
		});

		return NextResponse.json(true);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
