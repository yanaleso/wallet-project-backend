const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../utils");

const transactionSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["income", "expense"],
			required: [true, "Transaction's type is required"],
		},
		category: {
			type: String,
			required: [true, "Transaction's category is required"],
		},
		comment: {
			type: String,
			default: "",
		},
		date: {
			type: String,
			default: new Date(),
		},
		sum: {
			type: Number,
			required: [true, "Sum is required"],
			// default: null,
		},
		month: {
			type: String,
			default: null,
		},
		year: {
			type: String,
			default: null,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{ versionKey: false, timestamps: true }
);

transactionSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
	type: Joi.string().required(),
	category: Joi.string().required(),
	comment: Joi.string(),
	date: Joi.string(),
	sum: Joi.number().required(),
});

const Transaction = model("transactions", transactionSchema);

module.exports = { Transaction, addSchema };
