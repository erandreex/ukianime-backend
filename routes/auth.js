const express = require("express");

const check = require("../middlewares/auth_checks");
const { generarToken } = require("../middlewares/token");
const { validarCampos } = require("../middlewares/validar");
const process = require("../middlewares/process/auth");

const resp = require("../response/auth");

const auth = require("../controllers/auth");

const router = express.Router();

//Iniciar sesión
router.post("/", process.login, validarCampos, auth.login, resp.auth);

//Registro
router.post("/new", process.registro, validarCampos, auth.registro, resp.auth);

//Validar Autenticación
router.get("/", check.token, check.user, check.passCode, check.status, generarToken, resp.auth);

// Cambiar contraseña
router.post(
	"/cambiarPass",
	check.token,
	check.user,
	check.passCode,
	check.status,
	process.cambioPass,
	validarCampos,
	auth.changePassword,
	generarToken,
	resp.auth
);

module.exports = router;
