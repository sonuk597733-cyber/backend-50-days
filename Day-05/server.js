const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.post("/contact", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Data received successfully!"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});