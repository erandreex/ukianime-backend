const { response } = require("express");

const user = (req, res = response, next) => {
	const { firstname, lastname, status } = req.user;
	const token = req.token;
	const statusc = req.statusc;

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

const estado = (req, res = response, next) => {
	const statusc = req.statusc;

	return res.status(statusc).json({
		ok: true,
	});
};

const info = (req, res = response, next) => {
	const { firstname, lastname, status, createdAt, updatedAt } = req.user;
	const token = req.token;
	const statusc = req.statusc || 200;

	const user = {
		firstname,
		lastname,
		status,
		createdAt,
		updatedAt,
	};

	return res.status(statusc).json({
		ok: true,
		user,
		token,
	});
};

const question = (req, res = response, next) => {
	let question = "";
	let answer = "";

	if (req.question) {
		question = req.question.question;
		answer = req.question.answer;
	}

	const statusc = req.statusc || 200;

	return res.status(statusc).json({
		ok: true,
		question: question,
		answer: answer,
	});
};

module.exports = {
	user,
	estado,
	info,
	question,
};
