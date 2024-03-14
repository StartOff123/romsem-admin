import { User } from '@prisma/client';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

import getSession from '@/utils/getSession';

export async function DELETE(
	_: Request,
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

		await db.product.delete({ where: { id: params.id } });

		return NextResponse.json(true);
	} catch (error) {
		console.log('[REMOVE_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
