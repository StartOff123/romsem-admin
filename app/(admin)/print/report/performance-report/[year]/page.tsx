'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

const InvoicePDF = dynamic(
	() => import('@/components/performance-report-document'),
	{
		ssr: false
	}
);

export default function PrintPerfomanceReport() {
	const { year } = useParams() as { year: string };

	return <InvoicePDF year={Number(year)} />;
}
