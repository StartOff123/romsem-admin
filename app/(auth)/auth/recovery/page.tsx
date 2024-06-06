'use client';

import React from 'react';

import RecoveryChek from '@/forms/recovery-chek';
import RecoveryResetPassword from '@/forms/recovery-reset-password';

export default function RecoderyPage() {
	const [isValid, setIsValid] = React.useState<boolean>(false);
	const [login, setLogin] = React.useState<string | undefined>(undefined);

	return (
		<div className="flex flex-col items-center justify-center h-full">
			{isValid && login ? (
				<RecoveryResetPassword isValid={isValid} login={login} />
			) : (
				<RecoveryChek
					onValidData={(isValid) => setIsValid(isValid)}
					setLogin={(login) => setLogin(login)}
				/>
			)}
		</div>
	);
}
