const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../utils");

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, "Email is required"],
			// match: [emailRegexp, "Email is invalid"],
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: [true, "Password is required"],
		},
		firstName: {
			type: String,
		},

		token: {
			type: String,
			default: null,
		},
		balance: Number,
		default: 0,
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const sigUpInSchema = Joi.object({
	email: Joi.string()
		// .pattern(emailRegexp)
		.required(),
	password: Joi.string().min(6).required(),
	firstName: Joi.string().required(),
});

const logInShema = Joi.object({
	email: Joi.string()
		// .pattern(emailRegexp)
		.required(),
	password: Joi.string().min(6).required(),
});

const schemas = {
	register: sigUpInSchema,
	logIn: logInShema,
};

const User = model("users", userSchema);

module.exports = { User, schemas };
