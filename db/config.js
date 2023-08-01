const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://ukiDBAdmin:6Wo5A29qUtrmzviB@cluster0.w60cz.mongodb.net/uki?retryWrites=true&w=majority"
		);
		console.log("BD Online!");
	} catch (error) {
		console.log(error);
		throw new Error("Error a la hora de inicializar la DB");
	}
};

module.exports = {
	dbConnection,
};
