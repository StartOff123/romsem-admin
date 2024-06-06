import classNames from 'classnames';
import { Inter } from 'next/font/google';

import { ReduxProvider } from '@/providers/redux-provider';
import { ToasterProvider } from '@/providers/toaster-provider';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({
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
				<ReduxProvider>
					<ToasterProvider />
					<main className="h-full">{children}</main>
				</ReduxProvider>
			</body>
		</html>
	);
}
