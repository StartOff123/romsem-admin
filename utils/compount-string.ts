export const compountString = (arr: string[] | undefined): string => {
	if (typeof arr === 'undefined') return '';

	let str: string = '';

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i].toLowerCase();

		str +=
			i === 0
				? item[0].toUpperCase() + item.slice(1)
				: i === arr.length - 1
					? `, ${item}.`
					: `, ${item}`;
	}

	return str;
};
