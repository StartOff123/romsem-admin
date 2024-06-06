import { GrDeliver, GrSecure, GrUserManager } from 'react-icons/gr';
import { MdOutlineCookie, MdOutlineSupervisorAccount } from 'react-icons/md';

import { SelectOptions } from '@/ui/select';
import { IColumns } from '@/ui/table';

export const employeesColumns: IColumns[] = [
	{
		key: 1,
		dataIndex: 'order',
		title: '№'
	},
	{
		key: 2,
		dataIndex: 'user',
		title: 'Сотрудник'
	},
	{
		key: 3,
		dataIndex: 'role',
		title: 'Роль'
	},
	{
		key: 4,
		dataIndex: 'phone',
		title: 'Номер телефона'
	},
	{
		key: 5,
		dataIndex: 'createdAt',
		title: 'Дата регистрации'
	},
	{
		key: 6,
		dataIndex: 'actions',
		title: 'Действия'
	}
];

export const firedColumns: IColumns[] = [
	{
		key: 1,
		dataIndex: 'order',
		title: '№'
	},
	{
		key: 2,
		dataIndex: 'user',
		title: 'Сотрудник'
	},
	{
		key: 3,
		dataIndex: 'phone',
		title: 'Номер телевона'
	},
	{
		key: 4,
		dataIndex: 'deletedAt',
		title: 'Дата увольнения'
	},
	{
		key: 5,
		dataIndex: 'role',
		title: 'Роль'
	}
];

export const roleFilter: SelectOptions[] = [
	{
		title: 'Администратор',
		value: 'ADMIN',
		icon: <GrSecure color="rgb(248,40,90)" />
	},
	{
		title: 'Менеджер',
		value: 'MENEGER',
		icon: <GrUserManager color="rgb(27,145,255)" />
	},
	{
		title: 'Директор',
		value: 'DIRECTOR',
		icon: <MdOutlineSupervisorAccount color="rgb(23,198,116)" />
	},
	{
		title: 'Курьер',
		value: 'COURIER',
		icon: <GrDeliver color="rgb(160,109,254)" />
	},
	{
		title: 'Повар',
		value: 'COOK',
		icon: <MdOutlineCookie color="rgb(229,160,0)" />
	}
];
