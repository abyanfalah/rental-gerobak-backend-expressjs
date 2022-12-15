const express = require("express");
const gerobakController = require("../app/controller/gerobakController");
const gerobakTypeController = require("../app/controller/gerobakTypeController");
const router = express.Router();

const { isAdmin } = require("../app/middleware/authMiddleware");

// gerobak type routes, put first so the "type" keyword on the url read as path, not param
router.get("/type", gerobakTypeController.listGerobakType);
router.get("/type/:id", gerobakTypeController.getGerobakType);

router.post("/type", isAdmin, gerobakTypeController.createGerobakType);
router.put("/type/:id", isAdmin, gerobakTypeController.updateGerobakType);
router.delete("/type/:id", isAdmin, gerobakTypeController.deleteGerobakType);

// REAL gerobak routes
router.get("/", gerobakController.listGerobak);
router.get("/:id", gerobakController.getGerobak);

router.post("/", isAdmin, gerobakController.createGerobak);
router.put("/:id", isAdmin, gerobakController.updateGerobak);
router.delete("/:id", isAdmin, gerobakController.deleteGerobak);

module.exports = router;
