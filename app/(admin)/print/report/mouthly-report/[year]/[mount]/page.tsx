'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const InvoicePDF = dynamic(
	() => import('@/components/mounthly-report-document'),
	{
		ssr: false
	}
);

export default function PrintMounthlyReport() {
	const { mount, year } = useParams() as { year: string; mount: string };

	return <InvoicePDF year={Number(year)} mount={Number(mount)} />;
}
