import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxDotFilled } from 'react-icons/rx';

export interface SidebarItemProps {
	id: number;
	label: string;
	href: string;
	icon?: React.ReactNode;
	count?: number;
}

const SidebarItem = ({ href, label, icon, id }: SidebarItemProps) => {
	const pathname = usePathname();

	return (
		<Link
			key={id}
			href={href}
			className={classNames(
				'group flex gap-2 items-center cursor-pointer text-blue-100 p-2 rounded-lg transition-all',
				pathname + window.location.hash === href && 'bg-sky-500 bg-opacity-85'
			)}
		>
			<span
				className={classNames(
					'transition group-hover:opacity-100 group-hover:text-white w-[20px] flex justify-end',
					pathname + window.location.hash === href
						? 'opacity-100'
						: icon
							? 'opacity-70'
							: 'opacity-20'
				)}
			>
				{icon ? icon : <RxDotFilled size={15} />}
			</span>
			<h1
				className={classNames(
					'text-sm font-light transition group-hover:opacity-100 group-hover:text-white',
					pathname + window.location.hash === href
						? 'opacity-100 text-white'
						: 'opacity-50'
				)}
			>
				{label}
			</h1>
		</Link>
	);
};

export default SidebarItem;
