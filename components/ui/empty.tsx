import Image from 'next/image';

import emptyPng from '@/images/empty-box.png';

const Empty = ({ text }: { text: string }) => {
	return (
		<div className="flex flex-col gap-4 items-center py-16">
			<Image src={emptyPng} alt="empty" />
			<p className="text-sm">{text}</p>
		</div>
	);
};

export default Empty;
