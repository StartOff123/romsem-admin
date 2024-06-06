import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/utils/auth-option';

export default async function getSession() {
	return await getServerSession(authOptions);
}
