const mongoose = require("mongoose");

const interactionHistorySchema =
new mongoose.Schema({

    query: String,

    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports =
mongoose.model(
    "InteractionHistory",
    interactionHistorySchema
);