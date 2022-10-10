const express = require("express");
const dotenv = require("dotenv");
const { default: axios } = require("axios");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPEN_WEATHER_API;
const baseUrl = "https://api.openweathermap.org/data/2.5";

app.set("json spaces", 2);

app.get("/api/forecast/:city", async (req, res) => {
    const { city } = req.params;

    axios.get(`${baseUrl}/forecast?q=${city}&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        if (error.response) { res.status(error.response.status).send(error.response.data); return; }
        res.status(500).send("Server Error!");
    });
});

app.get("/api/weather/:city", async (req, res) => {
    const { city } = req.params;

    axios.get(`${baseUrl}/weather?q=${city}&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        if (error.response) { res.status(error.response.status).send(error.response.data); return; }
        res.status(500).send("Server Error!");
    });
});

app.listen(port, () => {
    console.log(`Api start running on port ${port}`);
});
