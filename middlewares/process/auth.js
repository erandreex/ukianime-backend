const field = require("../fields");

const registro = [field.firstname, field.username, field.password];

const cambioPass = [field.password];

const login = [field.requireUsername, field.requirePassword];

module.exports = {
	registro,
	cambioPass,
	login,
};
