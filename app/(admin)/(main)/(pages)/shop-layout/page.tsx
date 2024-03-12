import ShopLayoutBlock from '@/components/shop-layout-block';

import { Color } from '@/settings/colors';

export default function ShopLayout() {
	return (
		<div>
			<div className="py-2 border-b-[1px] border-zinc-300 flex justify-between items-center">
				<div>
					<h1 className="text-xl leading-7 font-semibold">Макет магазина</h1>
					<span className="text-xs leading-5 text-zinc-500">
						Главная - Макет магазина
					</span>
				</div>
			</div>
			<div className="py-8">
				<ShopLayoutBlock mainColor={Color['Orange']} logo="default-logo.png" />
			</div>
		</div>
	);
}
