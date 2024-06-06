'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const InvoicePDF = dynamic(() => import('@/components/order-document'), {
	ssr: false
});

export default function PrintOrderPage() {
	const { orderId } = useParams() as { orderId: string };

	return <InvoicePDF orderId={Number(orderId)} />;
}
