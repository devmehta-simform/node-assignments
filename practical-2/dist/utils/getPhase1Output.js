"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhase1Output = getPhase1Output;
function getPhase1Output(nowDateTime, openDateTime, closeDateTime) {
    if (nowDateTime >= openDateTime && nowDateTime <= closeDateTime) {
        return "OPEN";
    }
    else {
        return "CLOSE";
    }
}
