export const generateCardOrder = (() => {
	let count = 0;
	return () => {
		console.log(count);
		count += 1;
		return count;
	};
})();
