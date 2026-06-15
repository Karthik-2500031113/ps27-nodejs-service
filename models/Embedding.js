const mongoose = require("mongoose");

const EmbeddingSchema =
new mongoose.Schema({

    requestId: Number,

    text: String,

    embedding: [Number]

});

module.exports =
mongoose.model(
    "Embedding",
    EmbeddingSchema
);