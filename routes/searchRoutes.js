const express = require("express");

const router = express.Router();

const Embedding =
require("../models/Embedding");

const {
    generateEmbedding
} = require("../services/embeddingService");

function cosineSimilarity(vecA, vecB) {

    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < vecA.length; i++) {

        dot += vecA[i] * vecB[i];

        magA += vecA[i] * vecA[i];

        magB += vecB[i] * vecB[i];
    }

    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    return dot / (magA * magB);
}

router.post("/store", async (req, res) => {

    try {

        const { requestId, text } = req.body;

        const embedding =
            await generateEmbedding(text);

        const newEmbedding =
            new Embedding({
                requestId,
                text,
                embedding
            });

        await newEmbedding.save();

        res.json({
            message: "Embedding stored"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {

    try {

        const { query } = req.body;

        const queryEmbedding =
            await generateEmbedding(query);

        const allEmbeddings =
            await Embedding.find();

        const results =
            allEmbeddings.map(item => {

            const similarity =
                cosineSimilarity(
                    queryEmbedding,
                    item.embedding
                );

            return {
                requestId: item.requestId,
                text: item.text,
                similarity
            };
        });

        results.sort(
            (a, b) =>
                b.similarity - a.similarity
        );

        res.json(results.slice(0, 5));

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
