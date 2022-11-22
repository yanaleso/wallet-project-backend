const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSaveErrors } = require("../utils");
const { string } = require("joi");

const transactionSchema = new Schema(
	{
		typeOperation: {
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
			default: "",
		},
		timestamps: {
			type: Number,
			default: Number(new Date()),
		},
		amount: {
			type: Number,
			required: [true, "Sum is required"],
			// default: null,
		},
		balanceAfterTransaction: {
			type: String,
			required: [true, "balanceAfterTransaction is required"],
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
	typeOperation: Joi.string().required(),
	category: Joi.string().required(),
	comment: Joi.string(),
	date: Joi.string(),
	amount: Joi.number().required(),
});

const Transaction = model("transactions", transactionSchema);

module.exports = { Transaction, addSchema };
