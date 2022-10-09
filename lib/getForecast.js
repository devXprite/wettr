const { default: axios } = require("axios");
const chalk = require("chalk");
const moment = require("moment");

const getTimeing = (hour) => {
    if (hour == 5) {
        return "Morning";
    }
    if (hour == 11) {
        return "Noon";
    }
    if (hour == 17) {
        return "Evening";
    }
    return "Night";
};

const getForecast = (city) => new Promise((resolve, reject) => {
    axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e1b292964b3c86ad361260f80c9496e0`)
        .then((response) => {
            const newData = {};

            data = response.data;

            for (const e of data.list) {
                if ((Number(moment.unix(e.dt).format("h")) + 1) % 6 == 0) {
                    day = moment.unix(e.dt).format("ddd DD MMM");
                    if (!newData[day]) newData[day] = [];
                    newData[day].push([
                        chalk.cyan.bold(getTimeing(Number(moment.unix(e.dt).format("HH")))),
                        `${(e.main.temp - 273.15).toFixed(2)}°C`,
                        `${e.main.humidity}%`,
                        e.weather[0].description,
                        `${e.visibility}m`,
                        `${Math.floor(e.pop * 100)}%`,
                        `${e.wind.speed}m/s`,
                        e.clouds?.all ? `${e.clouds.all}%` : "no",
                        e.rain?.["3h"] ? `${e.rain["3h"]}mm` : "no",
                        e.snow?.["3h"] || "no",
                    ]);
                }
            }

            for (const day of Object.keys(newData)) {
                if (newData[day].length < 4) delete newData[day];
            }

            resolve(newData);
        })
        .catch((error) => {
            reject(error);
        });
});

module.exports = getForecast;
