const username = (req, res = response, next) => {
	req.key = "username";
	next();
};

const answer = (req, res = response, next) => {
	req.key = "answer";
	next();
};

module.exports = {
	username,
	answer,
};
