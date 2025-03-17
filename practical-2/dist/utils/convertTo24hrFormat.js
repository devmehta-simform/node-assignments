"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTo24hrFormat = convertTo24hrFormat;
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
    return [newHr, min];
}
