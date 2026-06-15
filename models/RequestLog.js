const mongoose = require("mongoose");

const requestLogSchema =
new mongoose.Schema({

    requestId: Number,

    action: String,

    user: String,

    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports =
mongoose.model(
    "RequestLog",
    requestLogSchema
);