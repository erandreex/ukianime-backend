const { response } = require("express");

const question = (req, res = response, next) => {
	const statusc = req.statusc || 200;
	const token = req.token;

	const { question } = req.question;

	return res.status(statusc).json({
		ok: true,
		question,
		token,
	});
};

const answer = (req, res = response, next) => {
	const statusc = req.statusc || 200;
	const token = req.token;

	return res.status(statusc).json({
		ok: true,
		token,
	});
};

const confirm = (req, res = response, next) => {
	const statusc = req.statusc || 200;
	const { question } = req.question;

	return res.status(statusc).json({
		ok: true,
		question,
	});
};

module.exports = {
	question,
	answer,
	confirm,
};
