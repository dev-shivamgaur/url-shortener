const express = require("express");
const router = express.Router();
const controller = require("../controllers/url.controller.js");

router.post("/shorten", controller.createShortUrl);
router.get("/analytics/:shortCode", controller.getAnalytics);
router.get("/shortCode/:shortCode", controller.redirectUrl);

module.exports = router;