const express = require("express");

const router = express.Router();

const InteractionHistory =
require("../models/InteractionHistory");

router.post("/", async (req, res) => {

    const interaction =
    await InteractionHistory.create({

        query:
        req.body.query
    });

    res.json(interaction);
});

router.get("/", async (req, res) => {

    const history =
    await InteractionHistory
        .find()
        .sort({
            timestamp: -1
        });

    res.json(history);
});

module.exports = router;