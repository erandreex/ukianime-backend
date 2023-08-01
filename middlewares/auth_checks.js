const { response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const Question = require("../models/question");

const token = (req, res = response, next) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			errors: ["Error token: no hay token [x-token] en el header."],
		});
	}

	try {
		const xtoken = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.xtoken = xtoken;
	} catch (err) {
		return res.status(401).json({
			ok: false,
			errors: ["Error token: Token invalido!"],
		});
	}

	next();
};

const user = async (req, res = response, next) => {
	const { id } = req.xtoken;

	if (!id) {
		return res.status(401).json({
			ok: false,
			errors: ["Error user: token no tiene el ID!"],
		});
	}

	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				ok: false,
				errors: ["Error user: usuario no encontrado!"],
			});
		}

		req.user = user;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: verificacion del usuario fallo!"],
		});
	}

	next();
};

const passCode = async (req, res = response, next) => {
	const { passCode } = req.xtoken;
	const User = req.user;

	if (!passCode) {
		return res.status(401).json({
			ok: false,
			errors: ["Error passcode: el token no contiene el passCode!"],
		});
	}

	try {
		if (passCode !== User.passCode) {
			return res.status(401).json({
				ok: false,
				errors: ["Error passcode: contraseña cambio, por favor vuelva a iniciar sesión!"],
			});
		}
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: verificacion del pass code fallo!"],
		});
	}

	next();
};

const status = async (req, res = response, next) => {
	const user = req.user;

	try {
		if (user.status !== "active") {
			return res.status(401).json({
				ok: false,
				errors: ["Error status: el usuario esta inactivo"],
			});
		}
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: "Error interno: verificación del estado fallo!",
		});
	}
	next();
};

// Restablecer

const username = async (req, res = response, next) => {
	const { username } = req.body;

	try {
		if (!username) {
			return res.status(400).json({
				ok: false,
				errors: ["Error username: no se ha enviado el username!"],
			});
		}
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({
				ok: false,
				errors: ["Error username: usuario no encontrado!"],
			});
		}

		req.user = user;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: busqueda del usuario fallo!"],
		});
	}
	next();
};

const answer = async (req, res = response, next) => {
	const { answer } = req.body;
	const { id_question } = req.xtoken;

	try {
		const question = await Question.findById({ _id: id_question });
		if (!question) {
			return res.status(404).json({
				ok: false,
				errors: ["Error pregunta: pregunta no encontrada!"],
			});
		}

		if (question.answer !== answer) {
			return res.status(400).json({
				ok: false,
				errors: ["Error pregunta: respuesta incorrecta!"],
			});
		}
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: busqueda de la pregunta del usuario fallo!"],
		});
	}
	next();
};

const tokenRest = (req, res = response, next) => {
	const token = req.header("x-rest");
	const key = req.key;

	if (!token) {
		return res.status(401).json({
			ok: false,
			errors: ["Error: no hay token [x-rest] en los headers"],
		});
	}

	try {
		const xtoken = jwt.verify(token, process.env.SECRET_JWT_SEED);
		req.xtoken = xtoken;

		const { pass } = xtoken;

		if (key !== pass) {
			return res.status(401).json({
				ok: false,
				errors: ["Error restauracion: el token no es válido aquí"],
			});
		}
		req.pass = "answer";
	} catch (err) {
		return res.status(401).json({
			ok: false,
			errors: ["Error restauracion: el token [x-rest] es invalido!"],
		});
	}

	next();
};

module.exports = {
	token,
	user,
	passCode,
	status,
	username,
	answer,
	tokenRest,
};
