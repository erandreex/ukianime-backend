const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { dbConnection } = require("./db/config");

// require("dotenv").config();

const app = express();

//DB
dbConnection();

//directorio publico
app.use(express.static("public"));

// CORS;
app.use(cors());

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	// res.setHeader("Access-Control-Allow-Origin", "https://ukianime.herokuapp.com");
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/user", require("./routes/user"));
app.use("/api/v1/favorite", require("./routes/favorite"));
app.use("/api/v1/rest", require("./routes/rest"));

app.get("/api/v1/check", (req, res) => {
	return res.status(200).json({
		ok: true,
	});
});

//Demas rutas
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
