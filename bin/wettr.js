#!/usr/bin/env node

/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/no-array-for-each */
const chalk = require("chalk");
const Table = require("cli-table3");
const ora = require("ora");
const { prompt } = require("enquirer");
const Icons = require("../icons/icons");
const getForecast = require("../lib/getForecast");
const getWeather = require("../lib/getWeather");

const spinner = ora();

const weather = (city) => new Promise((resolve, reject) => {
    spinner.start("fetching weather data ...");
    getWeather(city)
        .then((weatherObj) => {
            const weatherIcon = chalk.cyan(Icons[weatherObj.Weather]);

            const weatherData = Object.keys(weatherObj)
                .map(
                    (key) => `${chalk.whiteBright.bold(key)} : ${chalk.white(weatherObj[key] || chalk.gray("n\\a"))}`,
                )
                .filter(Boolean)
                .join("\n");

            delete weatherData.Weather;

            const weatherTable = new Table({
                chars: {
                    top: "",
                    "top-mid": "",
                    "top-left": "",
                    "top-right": "",
                    bottom: "",
                    "bottom-mid": "",
                    "bottom-left": "",
                    "bottom-right": "",
                    left: "",
                    "left-mid": "",
                    mid: "",
                    "mid-mid": "",
                    right: "",
                    "right-mid": "",
                    middle: " ",
                },
                style: {
                    "padding-left": 4,
                    head: ["yellow", "bold"],
                },
                // head: [{ colSpan: 2, content: "Current Weather:" }],
            });
            weatherTable.push([`\n${weatherData}`, " ".repeat(15), weatherIcon]);
            spinner.stop();
            resolve(weatherTable.toString());
        })
        .catch((error) => {
            if (error?.message) { spinner.fail(error?.message); return; }
            spinner.fail("Unable to fetch weather data.");
            reject();
        });
});

const foreCast = (city) => new Promise((resolve, reject) => {
    spinner.start("fetching weather forecast data...");
    getForecast(city)
        .then((foreCastObj) => {
            const table = new Table({
                head: [
                    { colSpan: 2, content: "Time" },
                    "Temperature",
                    "Weather",
                    "Humidity",
                    "Visibility",
                    "Precipitation",
                    "Wind",
                    "Cloud",
                    "Rain",
                    "snow",
                ],
                style: {
                    border: ["gray"],
                    head: ["brightRed", "bold"],
                },
                colAligns: ["center"],
            });

            Object.keys(foreCastObj).forEach((day) => {
                foreCastObj[day].forEach((dayObj, i) => {
                    const tableData = [];
                    if (i === 0) {
                        tableData.push({
                            rowSpan: 4,
                            content: chalk.green.bold(day),
                            vAlign: "center",
                        });
                    }
                    tableData.push(...dayObj);
                    table.push(tableData);
                });
            });

            spinner.stop();
            resolve(table.toString());
        })
        .catch((error) => {
            if (error?.message) { spinner.fail(error?.message); return; }
            spinner.fail("Unable to fetch weather data.");
            reject();
        });
});

(async () => {
    const { city } = await prompt({
        type: "input",
        name: "city",
        message: "Enter your city name",
    });

    console.log("\n");

    const weatherData = await weather(city);
    console.log(weatherData);

    const forecastData = await foreCast(city);
    console.log(chalk.yellow.bold("\n\n Weather forecast:"));
    console.log(forecastData);
})();
