const express = require("express");

const user = require("../controllers/user");

const { generarToken } = require("../middlewares/token");
const check = require("../middlewares/auth_checks");
const resp = require("../response/user");
const { validarCampos } = require("../middlewares/validar");

const process = require("../middlewares/process/user");

const router = express.Router();

// Info
router.get("/info", check.token, check.user, check.passCode, check.status, generarToken, resp.info);

// Editar customer
router.post("/edit", check.token, check.user, check.passCode, check.status, process.editar, validarCampos, user.edit, generarToken, resp.user);

// Cambio de estado
router.post(
	"/changeStatus",
	check.token,
	check.user,
	check.passCode,
	check.status,
	process.requirePassword,
	validarCampos,
	user.changeStatus,
	generarToken,
	resp.estado
);

// Agregar/Editar preguntas de seguridad
router.post(
	"/preguntas",
	check.token,
	check.user,
	check.passCode,
	check.status,
	process.respuesta,
	validarCampos,
	user.questions,
	generarToken,
	resp.user
);

// Listar preguntas de seguridad
router.post("/pregunta", check.token, check.user, check.passCode, check.status, user.listQuestion, generarToken, resp.question);

module.exports = router;
