import { default as data } from "./db/shopSchedule.json";
import { getPhase1Output } from "./utils/getPhase1Output";
import { getPhase2Output } from "utils/getPhase2Output";
import { getPhase3Output } from "utils/getPhase3Output";

const now = new Date();

const DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

console.log("phase 1: ", getPhase1Output(now, DaysOfWeek, data));

console.log("phase 2: ", getPhase2Output(now, DaysOfWeek, data));

console.log("phase 3: ", getPhase3Output(now, DaysOfWeek, data));
