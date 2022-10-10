const { default: axios } = require("axios");
const moment = require("moment");

const getWeather = (city) => new Promise((resolve, reject) => {
    axios
        .get(`https://wettr.vercel.app/api/weather/${city}`)
        .then((response) => {
            const responseData = response.data;
            resolve({
                Weather: responseData.weather[0].main,
                Description: responseData.weather[0].description,
                Tempreture: `${(responseData.main.temp - 273.15).toFixed(2)}°C`,
                // "Minimum temperature": `${(responseData.main.temp_max - 273.15).toFixed(2)}°C`,
                // "Maximum temperature": `${(responseData.main.temp_min - 273.15).toFixed(2)}°C`,
                Humidity: `${responseData.main.humidity}%`,
                Visibility: `${responseData.visibility}m`,
                Pressure: `${responseData.main.pressure} hPa`,
                "Wind Speed": `${responseData.wind.speed}m/s`,
                "Wind Direction": responseData.wind?.deg ? `${responseData.wind.deg}deg` : undefined,
                "Wind Gust": responseData.wind?.gust ? `${responseData.wind.gust}m/s` : undefined,
                Cloudiness: responseData.clouds?.all ? `${responseData.clouds.all}%` : "No",
                Rain: responseData.rain?.["3h"] ? `${responseData.rain["3h"]}mm` : "No",
                Snow: responseData.snow?.["3h"] ? `${responseData.snow["3h"]}mm` : "No",
                Sunrise: moment.unix(responseData.sys.sunrise).format("h:mm:ss A"),
                Sunset: moment.unix(responseData.sys.sunset).format("h:mm:ss A"),
                TimeZone: responseData.timezone,
                City: responseData.name,
                Latitude: responseData.coord.lat,
                Longitude: responseData.coord.lon,
                Time: moment.unix(responseData.dt).format("dddd, Do MMMM YYYY, h:mm:ss A"),
            });
        })
        .catch((error) => {
            reject(error?.response?.data);
        });
});

module.exports = getWeather;
