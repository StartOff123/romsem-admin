import { Role } from '@prisma/client';

export interface CreateUserDTO {
	firstName: string;
	lastName: string;
	surname: string;
	login: string;
	password: string;
	role?: Role;
	phone: string;
}
