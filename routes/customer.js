const express = require("express");
const customerController = require("../app/controller/customerController");

const { isAdmin } = require("../app/middleware/authMiddleware");

const router = express.Router();

router.get("/", customerController.listCustomer);
router.get("/:id", customerController.getCustomer);

router.post("/", isAdmin, customerController.createCustomer);
router.put("/:id", isAdmin, customerController.updateCustomer);
router.delete("/:id", isAdmin, customerController.deleteCustomer);

module.exports = router;
