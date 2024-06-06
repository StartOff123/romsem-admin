export type TimeOfDay = 'night' | 'morning' | 'day' | 'evening';

export const getTimeOfDay = (): TimeOfDay | null => {
	const date = new Date().toISOString().split('T')[1];

	if (date.split('.')[0] >= '19:00:00' && date.split('.')[0] < '01:00:00') {
		return 'night';
	} else if (
		date.split('.')[0] >= '01:00:00' &&
		date.split('.')[0] < '07:00:00'
	) {
		return 'morning';
	} else if (
		date.split('.')[0] >= '07:00:00' &&
		date.split('.')[0] < '13:00:00'
	) {
		return 'day';
	} else if (
		date.split('.')[0] >= '13:00:00' &&
		date.split('.')[0] < '19:00:00'
	) {
		return 'evening';
	}

	return 'night';
};
