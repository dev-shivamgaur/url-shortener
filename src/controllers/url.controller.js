const urlService = require("../services/url.service.js");

exports.createShortUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expiresAt } = req.body;

        const url = await urlService.createShortUrl(
            originalUrl, 
            customAlias, 
            expiresAt
        );

        res.status(201).json({
            shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const url = await urlService.getOriginalUrl(shortCode);

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const Url = require("../models/url.model");
        
        const url = await Url.findOne({ shortCode });

        if (!url) return res.status(404).json({ message: "Not found" });

        res.json({
            originalUrl: url.originalUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
            expiresAt: url.expiresAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}