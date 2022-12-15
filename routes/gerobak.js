const express = require("express");
const gerobakController = require("../app/controller/gerobakController");
const gerobakTypeController = require("../app/controller/gerobakTypeController");
const router = express.Router();

// gerobak type routes, put first so the "type" keyword on the url read as path, not param
router.get("/type/", gerobakTypeController.listGerobakType);
router.get("/type/:id", gerobakTypeController.getGerobakType);

router.post("/type/:id", gerobakTypeController.createGerobakType);
router.put("/type/:id", gerobakTypeController.updateGerobakType);
router.delete("/type/:id", gerobakTypeController.deleteGerobakType);

// REAL gerobak routes
router.get("/", gerobakController.listGerobak);
router.get("/:id", gerobakController.getGerobak);

router.post("/", gerobakController.createGerobak);
router.put("/:id", gerobakController.updateGerobak);
router.delete("/:id", gerobakController.deleteGerobak);

module.exports = router;
