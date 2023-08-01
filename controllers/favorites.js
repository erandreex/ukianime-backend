const { response } = require("express");

const Favorite = require("../models/favorite");

const exist = async (req, res = response, next) => {
	const { anime } = req.body;
	const { id } = req.xtoken;
	try {
		const favoritos = await Favorite.findOne({ userId: id });

		if (!favoritos) {
			return res.status(404).json({
				ok: false,
			});
		}

		const existe = favoritos.animes.includes(anime);

		if (existe) {
			return res.status(200).json({
				ok: true,
			});
		} else {
			return res.status(404).json({
				ok: false,
			});
		}
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de verificar el favorito fallo!"],
		});
	}
	next();
};

const addRemove = async (req, res = response, next) => {
	const { anime } = req.body;
	const { id } = req.xtoken;
	try {
		let favoritos;
		const favoritos1 = await Favorite.findOne({ userId: id });
		favoritos = favoritos1;

		if (!favoritos1) {
			const nuevoFavorito = new Favorite({ userId: id });

			favoritos = await nuevoFavorito.save();
		}

		const existe = favoritos.animes.includes(anime);

		if (existe) {
			favoritos.animes.pull(anime);
			req.mensaje = "Removido con exito!";
		} else {
			favoritos.animes.push(anime);
			req.mensaje = "Agreado con exito!";
		}

		await favoritos.save();
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de agregar/remover fallo!"],
		});
	}
	next();
};

const listar = async (req, res = response, next) => {
	const items_per_page = 12;
	const page = +req.query.page || 1;
	const { id } = req.xtoken;

	try {
		const favoritos = await Favorite.findOne({ userId: id });

		if (!favoritos) {
			return res.status(404).json({
				ok: false,
				errors: ["No tiene favoritos."],
			});
		}
		const totalFavoritos = favoritos.animes.length;
		const lista = paginate(favoritos.animes, items_per_page, page);

		return res.status(200).json({
			ok: true,
			msg: "Lista de favoritos",
			lista,
			paginaActual: page,
			totalFavoritos: totalFavoritos,
			hasNextPage: items_per_page * page < totalFavoritos,
			hasPreviousPage: page > 1,
			nextPage: page + 1,
			previousPage: page - 1,
			lastPage: Math.ceil(totalFavoritos / items_per_page),
		});
	} catch (err) {
		return res.status(500).json({
			ok: false,
			errors: ["Error interno: el proceso de listar sus favoritos fallo!"],
		});
	}
};

module.exports = {
	addRemove,
	listar,
	exist,
};

const paginate = (array, page_size, page_number) => {
	return array.reverse().slice((page_number - 1) * page_size, page_number * page_size);
};
