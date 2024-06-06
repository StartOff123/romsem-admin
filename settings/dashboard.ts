import { TimeOfDay } from '@/utils/get-time-of-day';

export const timeOfDay: Record<
	TimeOfDay,
	{ greetings: string; image: string }
> = {
	night: {
		greetings: 'Доброй ночи',
		image: '/images/night.jpg'
	},
	morning: {
		greetings: 'Доброе утро',
		image: '/images/sunrise.webp'
	},
	day: {
		greetings: 'Добрый день',
		image: '/images/noon.jpg'
	},
	evening: {
		greetings: 'Добрый вечер',
		image: '/images/sunset.jpg'
	}
};
