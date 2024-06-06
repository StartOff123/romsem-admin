import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { RxDotFilled } from 'react-icons/rx';

import Container from '@/components/container';
import HeaderUser from '@/components/header/header-user';

import { IItems } from '@/ui/dropdown';
import { DropDown } from '@/ui/index';

import { useAppSelector } from '@/hooks/redux-hooks';

import { sidebarPagesItems } from '@/settings/sidebar-items';

import pages from '@/images/pages.jpg';

const Header = () => {
	const { profile } = useAppSelector((state) => state.profileSlice);

	const navList: IItems[] = [
		{
			key: 1,
			access: 'full',
			label: (
				<div className="grid gap-4">
					<div className="overflow-hidden flex items-center h-[100px] rounded-lg">
						<Image src={pages} alt="pages" height={50} width={840} />
					</div>
					<div className="flex justify-between">
						{sidebarPagesItems.map((item) =>
							item.id === 5 && profile?.role !== 'DIRECTOR' ? null : (
								<div key={item.id} className="flex flex-col gap-2">
									{item.href ? (
										<Link
											href={item.href}
											className="text-base font-medium flex gap-2 items-center hover:text-sky-500 transition"
										>
											{item.icon} {item.label}
										</Link>
									) : (
										<h1 className="text-base font-medium flex gap-2 items-center">
											{item.icon}
											{item.label}
										</h1>
									)}
									<div className="grid gap-2 pl-2">
										{item.items.map((link) => (
											<Link
												key={link.id}
												href={link.href}
												className="group/link text-sm text-zinc-600 hover:text-sky-500 transition flex items-center gap-2"
											>
												<span className="text-zinc-300 flex justify-end items-center group-hover/link:text-sky-500 transition">
													<RxDotFilled size={15} />
												</span>
												{link.label}
											</Link>
										))}
									</div>
								</div>
							)
						)}
					</div>
				</div>
			)
		}
	];

	return (
		<header className="py-2 border-b-[1px] border-zinc-200">
			<Container>
				<div className="flex justify-between items-center">
					<div className="flex gap-6">
						<Link
							href="/dashboard"
							className="text-sm text-zinc-600 font-medium cursor-pointer hover:text-sky-500 transition"
						>
							Рабочий стол
						</Link>
						<DropDown width={840} left={-120} items={navList}>
							<h1 className="text-sm font-medium cursor-pointer">Страницы</h1>
						</DropDown>
					</div>
					<div>
						<HeaderUser />
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
