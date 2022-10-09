/* eslint-disable unicorn/no-array-for-each */
const chalk = require("chalk");
const Table = require("cli-table3");
const Icons = require("./icons/icons");
const getForecast = require("./lib/getForecast");
const getWeather = require("./lib/getWeather");

const weather = (city) => new Promise((resolve, reject) => {
    getWeather(city).then((weatherObj) => {
        const weatherIcon = chalk.cyan(Icons[weatherObj.Weather]);

        const weatherData = Object.keys(weatherObj)
            .map((key) => `${chalk.whiteBright.bold(key)} : ${chalk.white(weatherObj[key] || chalk.gray("n\\a"))}`)
            .filter(Boolean)
            .join("\n");

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
        weatherTable.push([
            `\n\n${weatherData}`,
            "             ",
            weatherIcon + chalk.magentaBright(`\n\t\t  ${weatherObj.Description}`),
        ]);
        resolve(weatherTable.toString());
    });
});

const foreCast = (city) => new Promise((resolve) => {
    getForecast(city).then((foreCastObj) => {
        const table = new Table({
            head: [
                { colSpan: 2, content: "Time" },
                "Temperature",
                "Humidity",
                "Weather",
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

        resolve(table.toString());
    });
});

const main = async () => {
    const city = "unnao";

    const weatherData = await weather(city);
    console.log(weatherData);

    console.log(chalk.yellow.bold("\n Weather forecast:"));
    const forecastData = await foreCast(city);
    console.log(forecastData);
};

main();
