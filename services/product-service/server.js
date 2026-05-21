const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        service: "Product Service",
        products: ["Laptop", "Phone"]
    });
});

app.listen(5052, () => {
    console.log("Product Service running on 5052");
});