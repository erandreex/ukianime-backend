const field = require("../fields");

const rest1 = [field.requireUsername];

const rest2 = [field.requireAnswer];

const rest3 = [field.password];

module.exports = {
	rest1,
	rest2,
	rest3,
};
