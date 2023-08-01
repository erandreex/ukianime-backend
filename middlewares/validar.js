const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
	const errors = validationResult(req).formatWith(errorFormatter);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.array({ onlyFirstError: false }),
		});
	}

	next();
};

module.exports = {
	validarCampos,
};

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
	return `${param}: ${msg}`;
};
