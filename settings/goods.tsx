import { BiSushi } from 'react-icons/bi';
import {
	BsSortAlphaDown,
	BsSortDown,
	BsSortDownAlt,
	BsSortNumericDownAlt
} from 'react-icons/bs';
import { CiPizza } from 'react-icons/ci';
import { CiCoffeeCup } from 'react-icons/ci';
import { GiSushis, GiWok } from 'react-icons/gi';

import { Sets } from '@/components/svg/sets';

import { SelectOptions } from '@/ui/select';

export const productTypeFilter: SelectOptions[] = [
	{
		title: 'Пицца',
		value: 'PIZZA',
		icon: <CiPizza size={17} color="#f97316" />
	},
	{
		title: 'Сеты',
		value: 'SETS',
		icon: <Sets />
	},
	{
		title: 'WOK',
		value: 'WOK',
		icon: <GiWok size={17} color="#59bc12" />
	},
	{
		title: 'Роллы',
		value: 'ROLS',
		icon: <BiSushi size={17} />
	},
	{
		title: 'Суши',
		value: 'SUSHI',
		icon: <GiSushis size={17} color="#e54949" />
	},
	{
		title: 'Напитки',
		value: 'BEVERAGES',
		icon: <CiCoffeeCup size={17} color="#513622" />
	}
];

export const sortFilter: SelectOptions[] = [
	{
		title: 'По возрастанию цены',
		value: 'ASC',
		icon: <BsSortDownAlt />
	},
	{
		title: 'По убыванию цены',
		value: 'DESC',
		icon: <BsSortDown />
	},
	{
		title: 'По популярности',
		value: 'popular',
		icon: <BsSortNumericDownAlt />
	},
	{
		title: 'По алфавиту',
		value: 'alphabetically',
		icon: <BsSortAlphaDown />
	}
];
