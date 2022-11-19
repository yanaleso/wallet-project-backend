const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../utils");

const userSchema = new Schema(
	{
		password: {
			type: String,
			// required: [true, "Password is required"],
		},
		email: {
			type: String,
			// required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ["starter", "pro", "business"],
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			// required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const signupSchema = Joi.object({
	password: Joi.any(),
	email: Joi.any(),
	subscription: Joi.any(),
	avatarURL: Joi.any(),
});

const User = model("users", userSchema);

module.exports = { User, signupSchema };
