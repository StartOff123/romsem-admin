'use client';

import { ConfigProvider } from 'antd';
import ru from 'antd/locale/ru_RU';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import React from 'react';

import { ModalProvider } from '@/providers/modal-provider';
import { NextProcessProvider } from '@/providers/next-process-provider';
import { ReduxProvider } from '@/providers/redux-provider';
import { ToasterProvider } from '@/providers/toaster-provider';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body
				className={classNames(inter.className, 'bg-white')}
				suppressHydrationWarning={true}
			>
				<ConfigProvider locale={ru}>
					<ReduxProvider>
						<NextProcessProvider />
						<ModalProvider />
						<ToasterProvider />
						{children}
					</ReduxProvider>
				</ConfigProvider>
			</body>
		</html>
	);
}
