import { Role } from '@prisma/client';
import { GrDeliver, GrSecure, GrUserManager } from 'react-icons/gr';
import { MdOutlineCookie, MdOutlineSupervisorAccount } from 'react-icons/md';

import { RoleEnum } from '@/types/index';

const roleObj: Record<
	Role,
	{ title: string; color: string; icon: React.ReactNode }
> = {
	ADMIN: {
		title: RoleEnum.ADMIN,
		color: '248,40,90',
		icon: <GrSecure />
	},
	COOK: {
		title: RoleEnum.COOK,
		color: '229,160,0',
		icon: <MdOutlineCookie />
	},
	COURIER: {
		title: RoleEnum.COURIER,
		color: '160,109,254',
		icon: <GrDeliver />
	},
	DIRECTOR: {
		title: RoleEnum.DIRECTOR,
		color: '23,198,116',
		icon: <MdOutlineSupervisorAccount />
	},
	MENEGER: {
		title: RoleEnum.MENEGER,
		color: '27,145,255',
		icon: <GrUserManager />
	}
};

const RoleString = ({ role }: { role?: Role }) => {
	if (!role) return null;

	return (
		<div>
			<div
				className="py-[2px] px-2 inline-flex rounded"
				style={{ background: `rgba(${roleObj[role].color}, 0.15)` }}
			>
				<span
					className="text-xs font-medium flex items-center gap-1"
					style={{ color: `rgb(${roleObj[role].color})` }}
				>
					{roleObj[role].icon}
					{roleObj[role].title}
				</span>
			</div>
		</div>
	);
};

export default RoleString;
