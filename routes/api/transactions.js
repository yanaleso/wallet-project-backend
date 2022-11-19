const express = require("express");
const ctrl = require("../../controllers/auth");
const {
	authenticate,
	// upload
} = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, ctrl.add);

module.exports = router;
