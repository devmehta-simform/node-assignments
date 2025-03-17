"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhase1Output = getPhase1Output;
const convertTo24hrFormat_1 = require("./convertTo24hrFormat");
function getPhase1Output(now, DaysOfWeek, ShopSchedule) {
    const todaysSchedule = ShopSchedule.find((s) => s.day === DaysOfWeek[now.getDay()]);
    if (todaysSchedule) {
        const [openHr] = (0, convertTo24hrFormat_1.convertTo24hrFormat)(todaysSchedule.open);
        const [closeHr] = (0, convertTo24hrFormat_1.convertTo24hrFormat)(todaysSchedule.close);
        if (now.getHours() >= parseInt(openHr) &&
            now.getHours() <= parseInt(closeHr)) {
            return "OPEN";
        }
        else {
            return "CLOSE";
        }
    }
    else {
        return "CLOSE";
    }
}
