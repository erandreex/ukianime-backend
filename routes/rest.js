const express = require("express");

const check = require("../middlewares/auth_checks");
const key = require("../middlewares/key");

const { generarToken, restPass, restPass2 } = require("../middlewares/token");
const resp = require("../response/rest");
const respUser = require("../response/user");
const { validarCampos } = require("../middlewares/validar");

const auth = require("../controllers/auth");
const user = require("../controllers/user");

const process = require("../middlewares/process/rest");

const router = express.Router();

//Check username
router.post("/", process.rest1, validarCampos, check.username, check.status, user.question, restPass, resp.question);

//Validar username token
router.get("/", key.username, check.tokenRest, user.questionById, resp.confirm);

//Check answer
router.post("/answer", process.rest2, validarCampos, key.username, check.tokenRest, check.answer, restPass2, resp.answer);

// Validar answer token
router.get("/answer", key.answer, check.tokenRest, resp.answer);

// Change password
router.post("/cambiarPass", process.rest3, validarCampos, key.answer, check.tokenRest, auth.restablecer, generarToken, respUser.user);

module.exports = router;
