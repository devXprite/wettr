/* eslint-disable no-restricted-syntax */
const { default: axios } = require("axios");
const chalk = require("chalk");
const moment = require("moment");

const getTimeing = (hour) => {
    if (hour === 5) {
        return "Morning";
    }
    if (hour === 11) {
        return "Noon";
    }
    if (hour === 17) {
        return "Evening";
    }
    return "Night";
};

const getForecast = (city) => new Promise((resolve, reject) => {
    axios
        .get(`https://wettr.vercel.app/api/forecast/${city}`)
        .then((response) => {
            const newData = {};

            const { list } = response.data;

            for (const listElement of list) {
                if ((Number(moment.unix(listElement.dt).format("h")) + 1) % 6 === 0) {
                    const day = moment.unix(listElement.dt).format("ddd DD MMM");

                    if (!newData[day]) newData[day] = [];

                    newData[day].push([
                        chalk.cyan.bold(getTimeing(Number(moment.unix(listElement.dt).format("HH")))),
                        `${(listElement.main.temp - 273.15).toFixed(2)}°C`,
                        listElement.weather[0].description,
                        `${listElement.main.humidity}%`,
                        `${listElement.visibility}m`,
                        `${Math.floor(listElement.pop * 100)}%`,
                        `${listElement.wind.speed}m/s`,
                        listElement.clouds?.all ? `${listElement.clouds.all}%` : "No",
                        listElement.rain?.["3h"] ? `${listElement.rain["3h"]}mm` : "No",
                        listElement.snow?.["3h"] || "no",
                    ]);
                }
            }

            for (const day of Object.keys(newData)) if (newData[day].length < 4) delete newData[day];

            resolve(newData);
        })
        .catch((error) => {
            reject(error?.response?.data);
        });
});

module.exports = getForecast;
