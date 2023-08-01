const { Schema, model } = require("mongoose");

const FavoriteSchema = Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		animes: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model("Favorite", FavoriteSchema);
