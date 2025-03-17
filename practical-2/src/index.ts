import { default as data } from "./db/shopSchedule.json";
import { getPhase1Output } from "./utils/getPhase1Output";

const now = new Date();

const DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

console.log("phase 1: ", getPhase1Output(now, DaysOfWeek, data));
