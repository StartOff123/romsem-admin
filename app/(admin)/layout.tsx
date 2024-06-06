import { ConfigProvider } from 'antd';
import ru from 'antd/locale/ru_RU';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';

import { ModalProvider } from '@/providers/modal-provider';
import { NextProcessProvider } from '@/providers/next-process-provider';
import { ReduxProvider } from '@/providers/redux-provider';
import { ToasterProvider } from '@/providers/toaster-provider';

import { EdgeStoreProvider } from '@/lib/edgestore';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<Head>
				<link rel="icon" href="/favicon.png" type="image/png" />
			</Head>
			<body
				className={classNames(inter.className, 'bg-white')}
				suppressHydrationWarning={true}
			>
				<ConfigProvider locale={ru}>
					<ReduxProvider>
						<EdgeStoreProvider>
							<NextProcessProvider />
							<ModalProvider />
							<ToasterProvider />
							{children}
						</EdgeStoreProvider>
					</ReduxProvider>
				</ConfigProvider>
			</body>
		</html>
	);
}
