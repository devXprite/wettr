const { default: axios } = require("axios");

const getWeather = (city) => new Promise((resolve, reject) => {
    axios
        .get(`https://weatherof.vercel.app/api/weather/${city}`)
        .then((response) => {
            const responseData = response.data;
            resolve({
                Weather: responseData.weather[0].main,
                Description: responseData.weather[0].description,
                Pressure: responseData.main.pressure,
                Tempreture: responseData.main.temp,
                "Tempreture Max": responseData.main.temp_max,
                "Tempreture Min": responseData.main.temp_min,
                Humidity: responseData.main.humidity,
                "Sea Leavel": responseData.main.sea_level,
                "Ground Leval": responseData.main.grnd_level,
                Humidity: responseData.main.humidity,
                Visibility: responseData.visibility,
                "Wind Speed": responseData.wind.speed,
                "Wind Direction": responseData.wind.deg,
                "Wind Gust": responseData.wind.gust,
                Cloudes: responseData.clouds.all,
                City: responseData.name,
                Sunrise: responseData.sys.sunrise,
                Sunset: responseData.sys.sunset,
                TimeZone: responseData.timezone,
                lon: responseData.coord.lon,
                lat: responseData.coord.lat,
                Time: responseData.dt,
            });
        })
        .catch((error) => {
            reject(error);
        });
});

module.exports = getWeather;
