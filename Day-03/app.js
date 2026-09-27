const express = require("express");

const app = express();

app.use(express.json());

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    const city = req.query.city;
    const token = req.headers.authorization;
    const method = req.method;
    const url = req.url;
    res.status(200);
    res.json({
        message: "User data received",
        request: {
            id: userId,
            city: city,
            authorization: token,
            method: method,
            url: url
        }
    });
});

app.post("/user", (req, res) => {
    const { name, age, city } = req.body;
    res.status(201);
    res.send(`
        User Created Successfully!<br>
        Name: ${name}<br>
        Age: ${age}<br>
        City: ${city}
    `);
});

module.exports = app;