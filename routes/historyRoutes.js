const express = require("express");

const router = express.Router();

const History =
require("../models/InteractionHistory");

router.post("/", async(req,res)=>{

    const history =
    await History.create(req.body);

    res.json(history);
});

router.get("/", async(req,res)=>{

    const history =
    await History.find();

    res.json(history);
});

module.exports = router;