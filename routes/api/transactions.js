const express = require("express");
const ctrl = require("../../controllers/transactions");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/", authenticate, ctrl.add);

router.get("/", authenticate, ctrl.getAllTransactions);
router.get("/statistics", authenticate, ctrl.getStatistics);

module.exports = router;
