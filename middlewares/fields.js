const { check } = require("express-validator");

const firstname = [
	check("firstname")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("El nombre es requerido")
		.isLength({ min: 1, max: 20 })
		.withMessage("El nombre debe tener una longitud de mínimo 1 y maximo 20 caracteres"),
];

const username = [
	check("username")
		.trim()
		.escape()
		.not()
		.isEmpty()
		.withMessage("es requerido")
		.isLength({ min: 5, max: 20 })
		.withMessage("debe tener una longitud de mínimo 5 y maximo 20 caracteres")
		.matches(/^[a-zA-Z0-9]+$/)
		.withMessage("Solo acepta numeros y letras"),
];

const lastname = [
	check("lastname").isLength({ min: 1, max: 20 }).withMessage("El nombre debe tener una longitud de mínimo 1 y maximo 20 caracteres"),
];

const password = [
	check("password")
		.trim()
		.not()
		.isEmpty()
		.withMessage("es requerida")
		.isLength({ min: 8, max: 20 })
		.withMessage("debe tener una longitud de mínimo 8 y maximo 20 caracteres")
		.matches("[0-9]")
		.withMessage("Debe contener mínimo un numero")
		.matches("[A-Z]")
		.withMessage("Debe contener mínimo una mayuscula"),
];

const answer = [
	check("answer").trim().isLength({ min: 3, max: 30 }).withMessage("La respuesta debe tener una longitud de mínimo 3 y máximo 30 caracteres"),
];

const requireUsername = [check("username").not().isEmpty().withMessage("es requerido")];
const requirePassword = [check("password").not().isEmpty().withMessage("es requerida")];

const requireAnswer = [check("answer").not().isEmpty().withMessage("es requerida")];

module.exports = {
	firstname,
	lastname,
	username,
	password,
	answer,
	requireUsername,
	requirePassword,
	requireAnswer,
};
