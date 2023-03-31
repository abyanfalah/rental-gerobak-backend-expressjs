module.exports = function (reqObject, newSessionData) {
	delete newSessionData.password;
	reqObject.session.user = newSessionData;
};
