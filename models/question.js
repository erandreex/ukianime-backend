const { Schema, model } = require("mongoose");

const QuestionsSchema = Schema(
	{
		question: {
			type: String,
			required: true,
			enum: ["Comida favorita", "Equipo favorito", "Videojuego favorito"],
		},
		answer: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model("Question", QuestionsSchema);
