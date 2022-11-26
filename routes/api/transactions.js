const express = require("express");
const ctrl = require("../../controllers/transactions");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, ctrl.add);

router.get("/", authenticate, ctrl.getAllTransactions);
router.get("/statistics", authenticate, ctrl.getStatistics);
router.get("/categories", authenticate, ctrl.getCategories);

module.exports = router;
