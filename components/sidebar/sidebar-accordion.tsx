import classNames from 'classnames';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import SidebarItem, {
	SidebarItemProps
} from '@/components/sidebar/sidebar-item';

export interface SidebarAccordionProps {
	id: number;
	label: string;
	href?: string;
	icon: React.ReactNode;
	items: SidebarItemProps[];
	open?: boolean;
	onOpen?: (id: number) => void;
}

const SidebarAccordion = ({
	icon,
	items,
	label,
	id,
	open,
	onOpen
}: SidebarAccordionProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<div
			key={id}
			className="overflow-hidden transition-all duration-500"
			style={{ height: open ? ref.current?.scrollHeight! + 36 : 36 }}
		>
			<div
				className={classNames(
					'group flex justify-between items-center cursor-pointer text-blue-100 p-2 rounded-lg'
				)}
				onClick={() => onOpen && onOpen(id)}
			>
				<div className="flex items-center gap-2">
					<span
						className={classNames(
							'transition group-hover:opacity-100 group-hover:text-white w-[20px] flex justify-end',
							open ? 'opacity-100 text-white' : 'opacity-70'
						)}
					>
						{icon}
					</span>
					<h1
						className={classNames(
							'text-sm font-light transition group-hover:opacity-100 group-hover:text-white',
							open ? 'opacity-100 text-white' : 'opacity-50'
						)}
					>
						{label}
					</h1>
				</div>
				<span
					className={classNames(
						'text-sm font-light transition group-hover:opacity-100 group-hover:text-white',
						open ? 'opacity-100 text-white rotate-180' : 'opacity-50'
					)}
				>
					<MdOutlineKeyboardArrowDown size={17} />
				</span>
			</div>
			<div ref={ref}>
				{items.map((item) => (
					<SidebarItem
						key={item.id}
						id={item.id}
						label={item.label}
						href={item.href}
					/>
				))}
			</div>
		</div>
	);
};

export default SidebarAccordion;
