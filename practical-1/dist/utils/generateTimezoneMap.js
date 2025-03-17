"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
exports.default = (() => {
    const dbDirPath = path_1.default.resolve(__dirname, "../db");
    const dbFilePath = path_1.default.resolve(dbDirPath, "db.json");
    console.log(dbDirPath, dbFilePath);
    if (!(0, fs_1.existsSync)(dbDirPath))
        (0, fs_1.mkdirSync)(dbDirPath);
    if (!(0, fs_1.existsSync)(dbFilePath)) {
        const userTimezones = Intl.supportedValuesOf("timeZone");
        const mapAbbr = {};
        userTimezones.forEach((tz) => {
            /* reference: https://bito.ai/resources/javascript-get-timezone-name-javascript-explained/#:~:text=Additionally%2C%20the%20method%20getTimezoneName(),time%20in%20the%20local%20timezone. */
            const timeZoneArr = new Date()
                .toLocaleString("en-US", {
                timeZoneName: "long",
                timeZone: tz,
            })
                .split(" ");
            const timeZone = timeZoneArr.splice((timeZoneArr.length - 3) * -1);
            const abbr = timeZone.map(([F]) => F).join("");
            if (mapAbbr[abbr])
                mapAbbr[abbr].push(tz);
            else
                mapAbbr[abbr] = [tz];
        });
        (0, fs_1.writeFileSync)(dbFilePath, JSON.stringify(mapAbbr));
    }
})();
