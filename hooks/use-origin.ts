import React from 'react';

export const useOrigin = () => {
	const [mounted, setMounted] = React.useState<boolean>(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const origin =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';
	if (!mounted) return null;

	return origin;
};
