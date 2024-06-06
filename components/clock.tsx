import Image from 'next/image';
import React from 'react';

import { timeOfDay } from '@/settings/dashboard';

import { getTimeOfDay } from '@/utils/get-time-of-day';

const Clock = () => {
	const [time, setTime] = React.useState(new Date());

	React.useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const hours =
		String(time.getHours()).length === 1
			? `0${time.getHours()}`
			: time.getHours();
	const minutes =
		String(time.getMinutes()).length === 1
			? `0${time.getMinutes()}`
			: time.getMinutes();
	const seconds =
		String(time.getSeconds()).length === 1
			? `0${time.getSeconds()}`
			: time.getSeconds();

	const timeString = `${hours}:${minutes}:${seconds}`;

	return (
		<div className="relative">
			<Image
				src={timeOfDay[getTimeOfDay()!].image}
				alt="image"
				width={0}
				height={0}
				sizes="100vh"
				className="w-full h-[400px] rounded-lg"
			/>
			<div className="absolute bottom-0 right-0 py-3 px-2 bg-black/30 rounded-br-lg rounded-tl-lg w-[150px] backdrop-blur-lg text-center">
				<h1 className="text-white text-2xl">{timeString}</h1>
			</div>
		</div>
	);
};

export default Clock;
