const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const filePath = "scores.json";

// hent scores
app.get("/scores", (req, res) => {
    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
});

// legg til score
app.post("/scores", (req, res) => {
    const newScore = req.body;
    const data = JSON.parse(fs.readFileSync(filePath));

    data.push(newScore);

    // sorter etter minst avvik
    data.sort((a, b) => a.difference - b.difference);

    const top10 = data.slice(0, 10);

    fs.writeFileSync(filePath, JSON.stringify(top10, null, 2));

    res.json(top10);
});

app.listen(PORT, () => {
    console.log("Server kjører på http://localhost:3000");
}); 