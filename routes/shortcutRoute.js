const express = require("express");
const router = express.Router();
const shortcutController = require("../controllers/shortcutController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/createShortcut", authMiddleware.Authorize, shortcutController.createShortcut);
router.get("/getShortcuts", authMiddleware.Authorize, shortcutController.getShortcuts);
router.get("/getShortcut", authMiddleware.Authorize, shortcutController.getShortcut);
router.put("/updateShortcut", authMiddleware.Authorize, shortcutController.updateShortcut);
router.delete("/deleteShortcut", authMiddleware.Authorize, shortcutController.deleteShortcut);
router.get("/filterShortcuts", authMiddleware.Authorize, shortcutController.filterShortcuts);
router.get("/searchShortcuts", authMiddleware.Authorize, shortcutController.searchShortcuts);

module.exports = router;