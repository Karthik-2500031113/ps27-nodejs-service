const express = require("express");
const router = express.Router();

const RequestLog =
require("../models/RequestLog");

router.post("/", async (req, res) => {

    try {

        const log =
        await RequestLog.create(
            req.body
        );

        res.json(log);

    } catch(err) {

        res.status(500)
           .json(err);
    }
});

router.get("/", async (req, res) => {

    const logs =
    await RequestLog.find()
                    .sort({
                        timestamp: -1
                    });

    res.json(logs);
});

module.exports = router;