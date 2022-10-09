const express = require("express");
const dotenv = require("dotenv");
const { default: axios } = require("axios");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPEN_WEATHER_API;

app.set("json spaces", 2);

app.get("/api/forecast/:city", async (req, res) => {
    const { city } = req.params;

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    });
});

app.get("/api/weather/:city", async (req, res) => {
    const { city } = req.params;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
