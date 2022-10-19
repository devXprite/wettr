/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/import-style */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const asciify = require("asciify-image");
const fs = require("fs");
const { join } = require("path");

const iconOptions = {
    fit: "box",
    width: 25,
    height: 25,
};

const fileName = "icons.json";

(
    async () => {
        const iconsObj = {};
        fs.writeFileSync(join(__dirname, fileName), JSON.stringify(iconsObj, undefined, 2), "utf8");

        await Promise.allSettled(fs.readdirSync(join(__dirname, "images")).map((file) => new Promise((resolve) => {
            if (!/.+\.png/.test(file)) {
                resolve();
                return;
            }
            asciify(join(__dirname, "images", file), iconOptions, (err, asciifiedImg) => {
                if (err) console.log(err);
                iconsObj[file.replace(/\.png/, "")] = asciifiedImg;
                resolve();
            });
        })));

        fs.writeFileSync(join(__dirname, fileName), JSON.stringify(iconsObj, undefined, 2), "utf8");
    }
)();
