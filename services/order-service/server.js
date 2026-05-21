const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        service: "Order Service",
        orders: [101, 102]
    });
});

app.listen(5053, () => {
    console.log("Order Service running on 5053");
});