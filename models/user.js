const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = Schema(
	{
		firstname: {
			type: String,
			allowNull: false,
			required: true,
		},
		lastname: {
			type: String,
			allowNull: true,
			default: null,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		passCode: {
			type: String,
			required: true,
			default: uuidv4(),
		},
		status: {
			type: String,
			default: "active",
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

module.exports = model("User", UserSchema);
