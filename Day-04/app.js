const http = require("http");

const app = http.createServer((req, res) => {

    if (req.method === "GET") {
        res.end("This is a GET request");
    }

    else if (req.method === "POST") {
        res.end("This is a POST request");
    }

    else if (req.method === "PUT") {
        res.end("This is a PUT request");
    }

    else if (req.method === "PATCH") {
        res.end("This is a PATCH request");
    }

    else if (req.method === "DELETE") {
        res.end("This is a DELETE request");
    }

    else {
        res.end("Method not allowed");
    }

});

module.exports = app;