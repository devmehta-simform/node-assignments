"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
require("./utils/generateTimezoneMap");
(() => {
    if (process.argv[3] === undefined) {
        console.log(`

    provide following command line arguments

    [1] CURRENT_TIME          : Current Time / Dynamic input
    [2] CURRENT_TIMEZONE      : <Timezone of the CURRENT_TIME>
    [3] CONVERT_TO_TIMEZONE   : <Timezone which wanted to convert to>

    separate the args by space

    Sample Usage:

    node index.js '12:00 AM' 'IST' 'PT'

    Output:

    CONVERTED_TIME '10:30 AM'

  `);
        return;
    }
    const currentTime = process.argv[2];
    const fromTz = process.argv[3];
    const toTz = process.argv[4];
    convertTz(currentTime, fromTz, toTz);
})();
function convertTz(currentTime, fromTzAbbr, toTzAbbr) {
    const tzMap = JSON.parse((0, fs_1.readFileSync)(path_1.default.resolve(__dirname, "db/db.json"), "utf8"));
    const [newHr, newMin] = convertTo24hrFormat(currentTime);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    if (Object.getOwnPropertyDescriptor(tzMap, toTzAbbr)) {
        const refTime = new Date(year, month, date, parseInt(newHr), parseInt(newMin));
        tzMap[fromTzAbbr].forEach((fromTz) => {
            tzMap[toTzAbbr].forEach((toTz) => {
                const diff = new Date(refTime.toLocaleString("en-US", { timeZone: toTz })).getTime() -
                    new Date(refTime.toLocaleString("en-US", { timeZone: fromTz })).getTime();
                console.log(`${fromTz}: ${currentTime} ${toTz}: `, new Date(refTime.getTime() + diff).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                }));
            });
        });
    }
}
function convertTo24hrFormat(currentTime) {
    const [hr, min, amOrPm] = currentTime.split(/[: ]/);
    let newHr = "";
    switch (amOrPm) {
        case "AM":
            if (hr === "12")
                newHr = "00";
            else
                newHr = hr;
            break;
        case "PM":
            if (hr === "12")
                newHr = "12";
            else
                newHr = (parseInt(hr) + 12).toString();
            break;
        default:
            throw new Error("invalide CURRENT_TIME format its hh:mm AM/PM");
    }
    return [newHr, min];
}
