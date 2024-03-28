export const generateCardOrder = (() => {
	let count = 0;

	const lastCardOrder = localStorage.getItem('lastCardOrder');
	if (lastCardOrder) {
		count = parseInt(lastCardOrder);
	}

	return () => {
		count += 1;
		return count;
	};
})();
