const express = require("express");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

// user register route

router.post(
  "/register",
  validateBody(schemas.register),
  ctrlWrapper(ctrl.register)
);

// user login route
router.post("/login", validateBody(schemas.logIn), ctrlWrapper(ctrl.login));

// user logout route
router.post("/logout", authenticate, ctrlWrapper(ctrl.logOut));

// route user get session info by token
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
