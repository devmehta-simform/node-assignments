"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shopSchedule_json_1 = __importDefault(require("./db/shopSchedule.json"));
const getPhase1Output_1 = require("./utils/getPhase1Output");
const SHOP_SCHEDULE = shopSchedule_json_1.default;
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const now = new Date();
const todaysSchedule = SHOP_SCHEDULE.find((schedule) => schedule.day === DAYS[now.getDay()]);
if (todaysSchedule) {
    const [openHr, openMin] = convertTo24hrFormat(todaysSchedule.open).split(":");
    const [closeHr, closeMin] = convertTo24hrFormat(todaysSchedule.close).split(":");
    const openDateTime = convertTimeToDate(now, openHr, openMin);
    const closeDateTime = convertTimeToDate(now, closeHr, closeMin);
    const nowDateTime = convertTimeToDate(now, now.getHours().toString(), now.getMinutes().toString());
    console.log((0, getPhase1Output_1.getPhase1Output)(nowDateTime, openDateTime, closeDateTime));
}
function convertTo24hrFormat(timeIn12hrFormat) {
    const [hr, min, amOrPm] = timeIn12hrFormat.split(/[ :]/);
    let newHr;
    switch (amOrPm) {
        case "AM":
            if (hr === "12") {
                newHr = "00";
            }
            else {
                newHr = hr;
            }
            break;
        case "PM":
            if (hr === "12") {
                newHr = hr;
            }
            else {
                newHr = (parseInt(hr) + 12).toString();
            }
            break;
        default:
            throw new Error("wrong time format");
    }
    return `${newHr}:${min}`;
}
function convertTimeToDate(now, hr, min) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hr), parseInt(min));
}
