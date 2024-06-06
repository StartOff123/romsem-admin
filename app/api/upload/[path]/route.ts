import mime from 'mime';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

import { writeFile } from 'fs/promises';

export async function POST(
	req: NextRequest,
	{ params }: { params: { path: string } }
) {
	const data = await req.formData();
	const image: Blob | null = data.get('image') as unknown as Blob;

	if (!image)
		return new NextResponse('Неудалось загрузить изображение', { status: 400 });

	const buffer = Buffer.from(await image.arrayBuffer());
	const uploadDir = join(process.cwd(), 'public', `/uploads/${params.path}`);

	try {
		const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${mime.getExtension(image.type)}`;
		await writeFile(`${uploadDir}/${imageName}`, buffer);

		return NextResponse.json({ imageName });
	} catch (error) {
		console.log('[CREARE_POST]', error);
		return new NextResponse('Внутренняя ошибка сервера', { status: 500 });
	}
}
