import { OrderStatus } from '@prisma/client';
import { FaCheck } from 'react-icons/fa6';
import { GrDeliver } from 'react-icons/gr';
import { LuClock4 } from 'react-icons/lu';
import { PiCookingPotLight } from 'react-icons/pi';

import { OrderStatusEnum } from '@/types/index';

const orderObj: Record<
	OrderStatus,
	{ title: string; color: string; icon: React.ReactNode }
> = {
	PROCESSING: {
		title: OrderStatusEnum.PROCESSING,
		color: '27,145,255',
		icon: <LuClock4 />
	},
	GETTINGREADY: {
		title: OrderStatusEnum.GETTINGREADY,
		color: '229,160,0',
		icon: <PiCookingPotLight />
	},
	DELIVERED: {
		title: OrderStatusEnum.DELIVERED,
		color: '23,198,116',
		icon: <GrDeliver />
	},
	ISSUED: {
		title: OrderStatusEnum.ISSUED,
		color: '160,109,254',
		icon: <FaCheck />
	}
};

const OrderString = ({ orderStatus }: { orderStatus?: OrderStatus }) => {
	if (!orderStatus) return null;

	return (
		<div>
			<div
				className="py-[2px] px-2 inline-flex rounded"
				style={{ background: `rgba(${orderObj[orderStatus].color}, 0.15)` }}
			>
				<span
					className="text-xs font-medium flex items-center gap-1"
					style={{ color: `rgb(${orderObj[orderStatus].color})` }}
				>
					{orderObj[orderStatus].icon}
					{orderObj[orderStatus].title}
				</span>
			</div>
		</div>
	);
};

export default OrderString;
