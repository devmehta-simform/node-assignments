"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shopSchedule_json_1 = __importDefault(require("./db/shopSchedule.json"));
const getPhase1Output_1 = require("./utils/getPhase1Output");
const now = new Date();
const DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
console.log("phase 1: ", (0, getPhase1Output_1.getPhase1Output)(now, DaysOfWeek, shopSchedule_json_1.default));
