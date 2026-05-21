const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        service: "User Service",
        users: ["Rohith", "Alex"]
    });
});

app.listen(5051, () => {
    console.log("User Service running on 5051");
});