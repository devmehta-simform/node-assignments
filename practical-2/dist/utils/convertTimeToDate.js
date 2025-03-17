"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToDate = convertTimeToDate;
function convertTimeToDate(now, hr, min) {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hr), parseInt(min));
}
