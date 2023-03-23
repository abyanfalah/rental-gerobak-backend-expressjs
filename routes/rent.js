const express = require("express");
const rentController = require("../app/controller/rentController");

const { isAdmin, isLogin } = require("../app/middleware/authMiddleware");

const router = express.Router();

router.get("/", rentController.listRent);
router.get("/today", rentController.listTodayRent);

// sub amount list
router.get("/:id/subamount", isLogin, rentController.getSubAmountList);
// router.get("/:id/subamount", rentController.getSubAmountList);

// add gerobak to existing rent
router.post("/:id/add_gerobak", isLogin, rentController.addGerobakToRent);

// payment history
router.get(
	"/:id/payment_history",
	isLogin,
	rentController.getRentPaymentHistory
);

// payment
router.get("/:id/bill", isLogin, rentController.getBill);
router.post("/:id/pay/all", isLogin, rentController.payAll);
router.post("/:id/pay", isLogin, rentController.payPartial);

router.get("/:id", rentController.getRent);

router.post("/", isLogin, rentController.createRent);

// router.put("/:id", isAdmin, rentController.updateRent);
// router.delete("/:id", isAdmin, rentController.deleteRent);

module.exports = router;
