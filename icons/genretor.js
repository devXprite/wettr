/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/import-style */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const asciify = require("asciify-image");
const fs = require("fs");
const { join } = require("path");

const options = {
    fit: "box",
    width: 25,
    height: 25,
};

const weatherCodes = [
    "01d",
    "02d",
    "03d",
    "04d",
    "09d",
    "10d",
    "11d",
    "13d",
    "50d",
    "01n",
    "02n",
    "03n",
    "04n",
    "09n",
    "10n",
    "11n",
    "13n",
    "50n",
];
const obj = {};
fs.writeFileSync("./data.json", JSON.stringify(obj, undefined, 2), "utf8");

for (const code of weatherCodes) {
    asciify(join(__dirname, "images", `${code}.png`), options, (err, asciified) => {
        if (err) console.log(err);
        console.log(asciified);
        obj[code] = asciified;
        fs.writeFileSync(join(__dirname, "icons.json"), JSON.stringify(obj, undefined, 2), "utf8");
    });
}
