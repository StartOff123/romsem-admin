import { BsBoxes } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { GoListOrdered } from 'react-icons/go';
import { LuLayoutTemplate } from 'react-icons/lu';
import { PiUsersThree } from 'react-icons/pi';
import { TbReportAnalytics } from 'react-icons/tb';

import { SidebarAccordionProps } from '@/components/sidebar/sidebar-accordion';

export const sidebarPagesItems: SidebarAccordionProps[] = [
	{
		id: 1,
		label: 'Аккаунт',
		icon: <FiUser size={20} />,
		items: [
			{
				id: 1,
				href: '/profile/overview',
				label: 'Обзор'
			},
			{
				id: 2,
				href: '/profile/settings',
				label: 'Настройки'
			}
		]
	},
	{
		id: 2,
		label: 'Заказы',
		icon: <GoListOrdered size={20} />,
		items: [
			{
				id: 1,
				href: '/orders/new',
				label: 'Новые',
			},
			{
				id: 2,
				href: '/orders/getting-ready',
				label: 'На готовке'
			},
			{
				id: 3,
				href: '/orders/delivered',
				label: 'Доставляются'
			},
			{
				id: 4,
				href: '/orders/closed',
				label: 'Закрырые'
			}
		]
	},
	{
		id: 3,
		label: 'Товары',
		href: '/goods',
		icon: <BsBoxes size={20} />,
		items: []
	},
	{
		id: 4,
		label: 'Сотрудники',
		icon: <PiUsersThree size={20} />,
		items: [
			{
				id: 1,
				href: '/employees/active',
				label: 'Действующие'
			},
			{
				id: 2,
				href: '/employees/fired',
				label: 'Уволенные'
			}
		]
	},
	{
		id: 5,
		label: 'Отчеты',
		icon: <TbReportAnalytics size={20} />,
		items: [
			{
				id: 1,
				href: '/reports/monthly-report',
				label: 'Ежемесячный отчет'
			},
			{
				id: 2,
				href: '/reports/performance-report',
				label: 'Отчет эффективности'
			}
		]
	}
];