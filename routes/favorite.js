const express = require("express");

const favorite = require("../controllers/favorites");

const check = require("../middlewares/auth_checks");
const resp = require("../response/favorite");

const router = express.Router();

// Agregar/Remover favorito
router.post("/addRemove", check.token, check.user, check.passCode, check.status, favorite.addRemove, resp.favorito);

// Listar favoritos
router.get("/list", check.token, check.user, check.passCode, check.status, favorite.listar);

// Existe el favorito
router.post("/exist", check.token, check.user, check.passCode, check.status, favorite.exist);

module.exports = router;
