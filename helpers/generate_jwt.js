const jwt = require("jsonwebtoken");

const generateJWT = (id, passCode) => {
	const payload = { id, passCode };

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: process.env.JWT_TIMEXP,
			},
			(err, token) => {
				if (err) {
					reject(err);
					console.log(err);
				} else {
					resolve(token);
				}
			}
		);
	});
};

const restJWT = (username, id_question, pass) => {
	const payload = { username, id_question, pass };

	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: process.env.JWT_TIMEXP,
			},
			(err, token) => {
				if (err) {
					reject(err);
					console.log(err);
				} else {
					resolve(token);
				}
			}
		);
	});
};

module.exports = {
	generateJWT,
	restJWT,
};
