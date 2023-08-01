const { response } = require("express");
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");

const { generateJWT } = require("../helpers/generate_jwt");

//Inicio de sesión
const login = async (req, res = response, next) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({
				ok: false,
				errors: ["Credenciales incorrectas. Vuelva a intentarlo!"],
			});
		}

		if (user.status !== "active") {
			return res.status(400).json({
				ok: false,
				errors: ["Usuario: el usuario esta inactivo!"],
			});
		}

		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				errors: "Credenciales incorrectas. Vuelva a intentarlo!",
			});
		}

		user.passCode = uuidv4();

		req.user = await user.save();
		req.token = await generateJWT(user.id, user.passCode);
		req.statusc = 200;

		next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso del login fallo!"],
		});
	}
};

//Registrarse
const registro = async (req, res = response, next) => {
	const { username, password } = req.body;

	try {
		const existUser = await User.findOne({ username });

		if (existUser) {
			return res.status(400).json({
				ok: false,
				errors: ["username: username ya registrado!"],
			});
		}

		const user = new User(req.body);

		const salt = bcrypt.genSaltSync();
		const passwordHash = bcrypt.hashSync(password, salt);

		user.password = passwordHash;

		req.user = await user.save();
		req.token = await generateJWT(user.id, user.passCode);
		req.statusc = 201;
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de registro fallo!"],
		});
	}
	next();
};

// Cambiar contraseña
const changePassword = async (req, res = response, next) => {
	const { oldPassword, password } = req.body;
	const user = req.user;

	try {
		if (oldPassword === password) {
			return res.status(401).json({
				ok: false,
				errors: ["Error cambio contraseña: Las contraseñas son iguales."],
			});
		}

		const validPassword = bcrypt.compareSync(oldPassword, user.password);

		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				errors: ["Error cambio contraseña: contraseña actual incorrecta!"],
			});
		}

		const salt = bcrypt.genSaltSync();
		const passwordHash = bcrypt.hashSync(newPassword1, salt);

		user.password = passwordHash;
		user.passCode = uuidv4();

		req.user = await user.save();
		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de cambio de contraseña fallo!"],
		});
	}
	next();
};

// Restablecer
const restablecer = async (req, res = response, next) => {
	const { username } = req.xtoken;
	const { password } = req.body;
	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(404).json({
				ok: false,
				errors: ["Error restablecer contraseña: el username no existe."],
			});
		}

		const salt = bcrypt.genSaltSync();
		const passwordHash = bcrypt.hashSync(password, salt);

		user.password = passwordHash;
		user.passCode = uuidv4();

		req.user = await user.save();

		req.xtoken.id = user._id;
		req.statusc = 200;
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de restablecer su contraseña fallo!"],
		});
	}
	next();
};

module.exports = {
	login,
	registro,
	changePassword,
	restablecer,
};
