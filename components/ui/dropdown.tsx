'use client';

import { Role } from '@prisma/client';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export interface IItems {
	key: number | string;
	access: Role | 'full';
	label: React.ReactNode;
	onClick?: () => void;
}

interface DropDownProps {
	items: IItems[];
	children: React.ReactNode;
	isArrow?: boolean;
	width: number;
	left: number;
}

const DropDown = ({
	children,
	items,
	width,
	left,
	isArrow = true
}: DropDownProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<div className="group relative">
			<div className="flex gap-1 items-center">
				<div className="text-zinc-600 group-hover:text-sky-500 transition">
					{children}
				</div>
				{isArrow && (
					<MdOutlineKeyboardArrowDown className="text-zinc-400 transition-all group-hover:rotate-180" />
				)}
			</div>
			<span
				style={{ width: ref.current ? ref.current.scrollWidth : 0 }}
				className="absolute h-8 hidden group-hover:block"
			/>
			<div
				ref={ref}
				style={{ width, left }}
				className="
                    absolute p-4 bg-white border-[1px] border-zinc-200 rounded  top-8 text-zinc-800 text-sm  flex flex-col gap-2 min-w-[190px] transition z-40 shadow-xl opacity-0 pointer-events-none translate-y-2
                    group-hover:opacity-100
                    group-hover:pointer-events-auto 
                    group-hover:translate-y-0
                "
			>
				{items.map((item) => (
					<div key={item.key}>{item.label}</div>
				))}
			</div>
		</div>
	);
};

export default DropDown;
