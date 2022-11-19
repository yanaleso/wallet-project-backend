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
			required: [true, "Transaction's comment is required"],
			// default: "starter",
		},
		sum: {
			type: Number,
			required: [true, "Sum is required"],
			// default: null,
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
	comment: Joi.string().required(),
	sum: Joi.number().required(),
});

const Transaction = model("transaction", transactionSchema);

module.exports = { Transaction, addSchema };
