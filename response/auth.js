const { response } = require("express");

const auth = (req, res = response, next) => {
	const { firstname, lastname, status } = req.user;

	const token = req.token;
	const statusc = req.statusc || 200;

	const user = {
		firstname,
		lastname,
		status,
	};

	return res.status(statusc).json({
		ok: true,
		user,
		token,
	});
};

module.exports = {
	auth,
};
