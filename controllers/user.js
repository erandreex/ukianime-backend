const { response } = require("express");

const Question = require("../models/question");

const bcrypt = require("bcryptjs");

// Editar usuario
const edit = async (req, res = response, next) => {
	const { firstname, lastname } = req.body;
	const user = req.user;

	try {
		user.firstname = firstname;
		user.lastname = lastname;

		const editUser = await user.save();

		// if (!editUser) {
		// 	return res.status(400).json({
		// 		ok: false,
		// 		errors: "Error: edicion del usuario fallida!",
		// 	});
		// }

		req.user = editUser;
		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de edicion del usuario fallo!"],
		});
	}
	next();
};

// Cambiar estado
const changeStatus = async (req, res = response, next) => {
	const user = req.user;

	const { password } = req.body;

	try {
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				errors: ["Error cambio de estado: contraseña incorrecta!"],
			});
		}

		let status = user.status;
		status = status === "active" ? "inactive" : "active";

		await user.update({ status });

		req.user = user;
		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de cambio de estado fallo!"],
		});
	}
	next();
};

//Add/Edit answer
const questions = async (req, res = response, next) => {
	const validas = ["Comida favorita", "Equipo favorito", "Videojuego favorito"];
	const { question, answer } = req.body;
	const user = req.user;

	try {
		if (!validas.includes(question)) {
			return res.status(400).json({
				ok: false,
				errors: ["Error respuesta a pregunta: esa pregunta no esta registrada!"],
			});
		}

		const preguntas = await Question.findOneAndUpdate({ userId: user.id, question }, { question, answer });

		if (!preguntas) {
			const quest = new Question({ userId: user.id, question, answer });
			quest.save();
		}

		req.statusc = 201;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de registrar respuesta a preguntas de seguridad fallo"],
		});
	}
	next();
};

//Listar todas las preguntas de seguridad
const listQuestion = async (req, res = response, next) => {
	const question = req.body.question || "1";

	const user = req.user;
	try {
		const pregunta = await Question.findOne({ userId: user.id, question }).select("question answer -_id");
		req.question = pregunta;

		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de listar preguntas de seguridad fallo!"],
		});
	}
	next();
};

// Listar alguna pregunta
const question = async (req, res = response, next) => {
	const user = req.user;
	try {
		const preguntas = await Question.find({ userId: user.id }).select("question");

		if (preguntas.length < 1) {
			return res.status(400).json({
				ok: false,
				errors: ["Error pregunta: el usuario no tiene preguntas."],
			});
		}
		req.question = preguntas[random(1, preguntas.length) - 1];
		req.statusc = 200;
		req.pass = "username";
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de listar una pregunta fallo"],
		});
	}
	next();
};

// Buscar pregunta de seguridad por id
const questionById = async (req, res = response, next) => {
	const { id_question } = req.xtoken;
	try {
		const pregunta = await Question.findById({ _id: id_question }).select("question -_id");

		if (pregunta.length < 1) {
			return res.status(404).json({
				ok: false,
				errors: ["Error pregunta de seguridad: no se ha encontrado la pregunta!"],
			});
		}
		req.question = pregunta;
		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de pregunta de seguridad fallo!"],
		});
	}
	next();
};

module.exports = {
	edit,
	changeStatus,
	questions,
	listQuestion,
	question,
	questionById,
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
