const { response } = require("express");

const favorito = (req, res = response, next) => {
	const mensaje = req.mensaje;

	return res.status(200).json({
		ok: true,
		msg: mensaje,
	});
};

module.exports = {
	favorito,
};
