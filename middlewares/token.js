const { response } = require("express");

const { generateJWT, restJWT, restQuestion } = require("../helpers/generate_jwt");

exports.generarToken = async (req, res = response, next) => {
	const { id } = req.xtoken;
	const user = req.user;

	try {
		req.token = await generateJWT(id, user.passCode);
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: proceso de generar el token fallo!"],
		});
	}
	next();
};

exports.restPass = async (req, res = response, next) => {
	const { _id } = req.question;
	const { username } = req.body;
	const pass = req.pass || "1";

	try {
		req.token = await restJWT(username, _id, pass);
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: proceso de generar el token fallo!"],
		});
	}
	next();
};

exports.restPass2 = async (req, res = response, next) => {
	const id_question = "";
	const { username } = req.xtoken;
	const pass = req.pass || "1";

	try {
		req.token = await restJWT(username, id_question, pass);
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: proceso de generar el token fallo!"],
		});
	}
	next();
};
