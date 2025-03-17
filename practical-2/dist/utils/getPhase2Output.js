"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhase2Output = getPhase2Output;
const convertTo24hrFormat_1 = require("./convertTo24hrFormat");
function getPhase2Output(now, DaysOfWeek, ShopSchedule) {
    let ithDaysSchedule, i = 0;
    while (ithDaysSchedule === undefined && i < DaysOfWeek.length) {
        ithDaysSchedule = ShopSchedule.find((s) => s.day === DaysOfWeek[(now.getDay() + i) % DaysOfWeek.length]);
        i++;
    }
    if (ithDaysSchedule) {
        const ithDaysNow = new Date(now);
        ithDaysNow.setDate(ithDaysNow.getDate() + (i - 1));
        const [openHr, openMin] = (0, convertTo24hrFormat_1.convertTo24hrFormat)(ithDaysSchedule.open);
        const [closeHr, closeMin] = (0, convertTo24hrFormat_1.convertTo24hrFormat)(ithDaysSchedule.close);
        const openDateTime = new Date(ithDaysNow.getFullYear(), ithDaysNow.getMonth(), ithDaysNow.getDate(), parseInt(openHr), parseInt(openMin));
        const closeDateTime = new Date(ithDaysNow.getFullYear(), ithDaysNow.getMonth(), ithDaysNow.getDate(), parseInt(closeHr), parseInt(closeMin));
        if (now.getTime() >= openDateTime.getTime() &&
            now.getTime() <= closeDateTime.getTime()) {
            return `Open, The shop will be closed within ${Math.ceil((closeDateTime.getTime() - now.getTime()) / (1000 * 60 * 60))} Hrs`;
        }
        else {
            return `Closed. The shop will be open after ${Math.ceil((openDateTime.getTime() - now.getTime()) / (1000 * 60 * 60))} Hrs`;
        }
    }
    else {
        return "Closed for now. No further information is available";
    }
}
