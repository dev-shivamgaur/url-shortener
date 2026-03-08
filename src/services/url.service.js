const { nanoid } = require("nanoid");
const Url = require("../models/url.model.js");

exports.createShortUrl = async (originalUrl, customAlias, expiresAt) => {
    const shortCode = customAlias || nanoid(6);

    const existing = await Url.findOne({ shortCode });
    if (existing) {
        throw new Error("Short code already exists");
    }

    const url = await Url.create({
        originalUrl,
        shortCode,
        expiresAt,
    });

    return url;
}

exports.getOriginalUrl = async (shortCode) => {
    const url = await Url.findOne({ shortCode });

    if (!url) throw new Error("URL not found");

    if (url.expiresAt && new Date() > url.expiresAt) {
        throw new Error("URL expired");
    }

    url.clicks++;
    await url.save();

    return url;
}