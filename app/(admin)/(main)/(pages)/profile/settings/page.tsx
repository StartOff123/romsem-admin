'use client';

import ChangeLoginForm from '@/forms/change-login-form';
import EditProfileForm from '@/forms/edit-profile-form';
import ResetPasswordForm from '@/forms/reset-password-form';

export default function ProfileSettingsPage() {
	document.title = 'Настройки профиля | RomSem CRM';

	return (
		<div className="flex flex-col gap-8">
			<div className="flex items-center justify-between">
				<h1 className="font-medium text-lg">Информация</h1>
			</div>
			<EditProfileForm />
			<div>
				<div className="flex items-center justify-between">
					<h1 className="font-medium text-lg">Параметры входа</h1>
				</div>
				<ChangeLoginForm />
				<span className="w-full border-b-[1px] border-zinc-300 border-dashed block" />
				<ResetPasswordForm />
			</div>
		</div>
	);
}
