const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const searchRoutes =
require("./routes/searchRoutes");

const logRoutes =
require("./routes/logRoutes");

const interactionRoutes =
require("./routes/interactionRoutes");

const historyRoutes =
require("./routes/historyRoutes");

const app = express();

// ---------------- MIDDLEWARE ---------------- //

app.use(cors());
app.use(express.json());

// ---------------- MONGODB CONNECTION ---------------- //

mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log(
        "MongoDB Connected"
    );

})

.catch((err) => {

    console.log(err);

});

// ---------------- ROUTES ---------------- //

app.use(
    "/api/search",
    searchRoutes
);

app.use(
    "/api/logs",
    logRoutes
);

app.use(
    "/api/interactions",
    interactionRoutes
);

app.use(
    "/api/history",
    historyRoutes
);

// ---------------- HOME ---------------- //

app.get("/", (req, res) => {

    res.json({

        message:
        "Node.js Service Running"

    });

});

// ---------------- SERVER ---------------- //

app.listen(
    process.env.PORT,
    () => {

        console.log(
            `Server running on port ${process.env.PORT}`
        );

    }
);