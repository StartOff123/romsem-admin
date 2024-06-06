import { Role } from '@prisma/client';
import Image, { ImageLoader } from 'next/image';
import React from 'react';

import { RoleString } from '@/ui/index';

import profileBg from '@/images/profile-head-bg.jpg';
import defaultAvatar from '@/images/user-default.png';

interface ProfileHeadProps {
	name: {
		firstName: string;
		lastName: string;
	};
	avatar: string | null | undefined;
	role: Role;
	description: string | null | undefined;
}

const ProfileHead = ({ description, avatar, name, role }: ProfileHeadProps) => {
	return (
		<div className="py-4">
			<div className="relative h-[200px] overflow-hidden rounded-md">
				<Image
					src={profileBg}
					alt="bg"
					className="absolute top-1/2 -translate-y-1/2"
				/>
			</div>
			<div className="flex flex-col px-8">
				<div className="relative flex">
					<div className="absolute bottom-full translate-y-10">
						<div className="rounded-full overflow-hidden z-10 h-[130px] w-[130px] flex items-center relative">
							{avatar ? (
								<Image
									src={avatar}
									width={130}
									height={130}
									fill
									alt="avatar"
									/>
								) : (
									<Image
									src={defaultAvatar}
									width={130}
									height={130}
									fill
									alt="avatar"
								/>
							)}
						</div>
						<span
							style={{ width: 'calc(100% + 4px)', height: 'calc(100% + 4px)' }}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 pt-12">
					<div className="flex items-center gap-2">
						<h1 className="text-lg font-semibold">
							{name.firstName} {name.lastName}
						</h1>
						<RoleString role={role} />
					</div>
					<p className="text-sm text-zinc-400 font-medium">
						{description ? description : 'Расскажите о себе что-нибудь'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileHead;
