'use client';

import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';

import SidebarAccordion from '@/components/sidebar/sidebar-accordion';
import SidebarItem from '@/components/sidebar/sidebar-item';

import { useAppSelector } from '@/hooks/redux-hooks';

import { sidebarPagesItems } from '@/settings/sidebar-items';

const Sidebar = () => {
	const { profile } = useAppSelector((state) => state.profileSlice);
	const [currentOpenItem, setCurrentOpenItem] = React.useState<number | null>(
		null
	);

	const handleOpenItem = (id: number) => {
		if (currentOpenItem === id) return setCurrentOpenItem(null);
		setCurrentOpenItem(id);
	};

	return (
		<div className="w-full bg-[#202B46] h-full flex flex-col gap-4">
			<div className="p-4 border-b-[1px] border-dashed border-gray-600 flex justify-between items-center">
				<h1 className="text-white text-xl font-semibold">RomSem CRM</h1>
				<button className="flex bg-zinc-200 bg-opacity-10 relative w-7 h-7 rounded hover:text-sky-500 text-white transition">
					<IoIosArrowBack
						size={18}
						className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-2.5"
					/>
					<IoIosArrowBack
						size={18}
						className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1.5 opacity-35"
					/>
				</button>
			</div>
			<div className="px-4 flex flex-col gap-4">
				<SidebarItem
					key={1}
					id={1}
					icon={<LuLayoutDashboard size={20} />}
					href="/"
					label="Рабочий стол"
				/>
				<div>
					<h1 className="text-zinc-500 text-sm font-semibold">Страницы</h1>
					<div className="py-4 flex flex-col gap-2">
						{sidebarPagesItems.map((item) => {
							if (item.id === 5 && profile?.role !== 'DIRECTOR') {
								if (profile?.role !== 'ADMIN') return null;
							}

							if (item.href) {
								return (
									<SidebarItem
										key={item.id}
										id={item.id}
										icon={item.icon}
										href={item.href}
										label={item.label}
									/>
								);
							}
							return (
								<SidebarAccordion
									id={item.id}
									key={item.id}
									icon={item.icon}
									items={item.items}
									label={item.label}
									open={currentOpenItem === item.id ? true : false}
									onOpen={(id) => handleOpenItem(id)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
