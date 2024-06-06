import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import { RecoveryChekType } from '@/types/index';

export async function POST(req: Request) {
	try {
		const data = (await req.json()) as RecoveryChekType;

		const user = await db.user.findUnique({ where: { login: data.login } });
		if (!user || user.recovery_key !== data.recovery_key)
			return new NextResponse('Неверный логин или ключ', { status: 400 });

		return NextResponse.json(true);
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
