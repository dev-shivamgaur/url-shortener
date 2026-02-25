const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            requred: true,
        },
        shortCode: {
            type: String,
            required: true,
            unique: true,
        },
        clicks: {
            type: Number,
            default: 0,
        },
        expiresAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);