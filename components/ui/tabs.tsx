import classNames from 'classnames';
import React from 'react';

export interface TabsItem {
	key: number;
	label: string;
	children: React.ReactNode;
	onClick?: () => void;
}

interface TabsProps {
	defaultActiveKey?: number;
	items: TabsItem[];
}

const Tabs = ({ items, defaultActiveKey = 1 }: TabsProps) => {
	const ref = React.useRef<HTMLDivElement[]>([]);

	const calcTranslateSlider = (key: number): number => {
		let translate = 0;

		for (let i = 0; i < key - 1; i++) {
			if (key === 0 || !ref.current[i]) return (translate = 0);
			translate += ref.current[i].scrollWidth;
		}

		return translate;
	};

	const handleStrafe = (key: number) => {
		setSlideWidth(ref.current[key - 1].scrollWidth + 2);
		setTranslateSlider(calcTranslateSlider(key));
		setActiveTab(key);
	};

	const [activeTab, setActiveTab] = React.useState<number>(1);
	const [slideWidth, setSlideWidth] = React.useState<number>(
		ref.current.length && ref.current[activeTab - 1].scrollWidth
	);
	const [translateSlider, setTranslateSlider] = React.useState<number>(
		calcTranslateSlider(activeTab)
	);

	const handleChangeTab = (key: number, onClick: (() => void) | undefined) => {
		if (onClick) onClick();
		handleStrafe(key);
	};

	React.useEffect(() => {
		if (ref.current) handleStrafe(defaultActiveKey);
	}, [defaultActiveKey]);

	return (
		<div>
			<div className="flex relative px-4">
				{items.map((item) => (
					<div
						ref={(el) => (el ? ref.current.push(el) : [])}
						key={item.key}
						className={classNames(
							'text-sm px-2 py-1.5 z-10 transition cursor-pointer select-none min-w-[120px] text-center',
							activeTab === item.key
								? 'text-zinc-500'
								: 'text-black hover:text-blue-500'
						)}
						onClick={() => handleChangeTab(item.key, item.onClick)}
					>
						{item.label}
					</div>
				))}
				<span
					style={{
						width: slideWidth,
						transition: 'all .2s ease-in-out',
						transform: `translateX(${translateSlider}px)`
					}}
					className="absolute rounded-t-md h-full top-[1px] border-[1px] border-zinc-300 border-b-white"
				/>
			</div>
			<div className="p-4 rounded-md border-zinc-300 border-[1px]">
				{items.filter((item) => item.key === activeTab)[0].children}
			</div>
		</div>
	);
};

export default Tabs;
