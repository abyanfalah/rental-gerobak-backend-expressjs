module.exports = (obj1, obj2) => {
	let result = true;
	for (let prop in obj1) {
		if (obj1[prop] != obj2[prop]) {
			result = false;
			break;
		}
	}
	return result;
};
