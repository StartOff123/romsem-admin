'use client';

import Image, { ImageLoader } from 'next/image';
import { BsHandbag } from 'react-icons/bs';
import { LuSearch } from 'react-icons/lu';

import { Color } from '@/settings/colors';

interface ShopLayoutBlockProps {
	mainColor: Color;
	logo: string;
}

const ShopLayoutBlock = ({ logo, mainColor }: ShopLayoutBlockProps) => {
	const imageLoager: ImageLoader = ({ src, width }) => {
		return `/shop/logo/${src}?w=${width}`;
	};

	return (
		<div className="w-[800px] mx-auto grid gap-2">
			<p className="text-sm text-zinc-400">Макет магазина</p>
			<div className="p-2 bg-zinc-200 flex flex-col gap-2 rounded-xl">
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						<span className="flex items-center bg-white shadow py-2 px-3 rounded-xl gap-2">
							<Image
								loader={imageLoager}
								src={logo}
								width={30}
								height={30}
								alt="logo"
							/>
							<h1 className="font-light">ROMSEM</h1>
						</span>
						<span className="flex-1 bg-white shadow p-2 rounded-xl flex items-center justify-end gap-2">
							<span className="relative text-zinc-400">
								<BsHandbag size={25} />
								<span
									style={{ background: mainColor }}
									className="absolute text-white text-[10px] px-0.5 rounded-full -top-1 -right-1 transition-all"
								>
									12
								</span>
							</span>
							<span className="h-4 bg-zinc-200 w-20 rounded-xl"></span>
						</span>
					</div>
				</div>
				<div className="bg-white shadow p-2 rounded-xl flex items-center justify-between">
					<div className="flex gap-2">
						{Array(5)
							.fill(1)
							.map((_, i) => (
								<span key={i} className="h-2 w-10 bg-zinc-200 rounded-xl" />
							))}
						<span
							style={{ background: mainColor }}
							className="h-2 w-10 rounded-xl transition-all"
						/>
					</div>
					<span className="border-[1px] rounded p-2 text-zinc-500 flex items-center gap-2 w-[300px]">
						<LuSearch />
						<p className="text-sm text-zinc-400">Найти в магазине</p>
					</span>
				</div>
				<div className="grid gap-2">
					<div className="bg-white shadow p-4 rounded-xl h-[300px] flex items-end justify-end gap-2">
						<span className="w-36 py-2 border-[1px] flex justify-center rounded text-zinc-400 border-zinc-300 text-sm">
							Подробнее
						</span>
						<span
							style={{ background: mainColor }}
							className="w-36 py-2 flex justify-center rounded text-white text-sm"
						>
							В корзину
						</span>
					</div>
					<div className="flex items-center justify-center gap-2">
						<span
							style={{ background: mainColor }}
							className="w-10 h-1 rounded-xl"
						/>
						{Array(2)
							.fill(1)
							.map((_, i) => (
								<span key={i} className="w-10 h-1 rounded-xl bg-zinc-300" />
							))}
					</div>
				</div>
				<div className=""></div>
			</div>
		</div>
	);
};

export default ShopLayoutBlock;
