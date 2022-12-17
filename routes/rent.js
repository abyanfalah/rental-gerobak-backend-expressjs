const express = require("express");
const rentController = require("../app/controller/rentController");

const { isAdmin, isLogin } = require("../app/middleware/authMiddleware");

const router = express.Router();

// payment
router.post("/:id/pay/all", rentController.payAll);
// router.post("/:id/pay", rentController.partialPay);

router.get("/", rentController.listRent);
router.get("/:id", rentController.getRent);

router.post("/", isLogin, rentController.createRent);
// router.put("/:id", isAdmin, rentController.updateRent);
// router.delete("/:id", isAdmin, rentController.deleteRent);

module.exports = router;
