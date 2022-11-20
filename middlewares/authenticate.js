const { RequestError } = require("../utils");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	try {
		console.log("before mw woking..");
		const { authorization } = req.headers;
		console.log("authorization: ", authorization);
		const [bearer, token] = authorization.split(" ");
		if (bearer !== "Bearer" || !token) throw RequestError(401);
		const { id } = jwt.verify(token, SECRET_KEY);
		req.userId = id;
		console.log("after mw woking..");
		next();
	} catch (error) {
		if (!error.status) {
			error.status = 401;
			error.message = "Unauthorized";
		}
		next(error);
	}
};

module.exports = authenticate;
