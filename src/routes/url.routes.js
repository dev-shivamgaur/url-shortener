const express = require("express");
const router = express.Router();
const controller = require("../controllers/url.controller");

router.post("/shorten", controller.createShortUrl);
router.get("/analytics/:shortCode", controller.getAnalytics);
router.get("/shortCode", controller.redirectUrl);

router.exports = router;