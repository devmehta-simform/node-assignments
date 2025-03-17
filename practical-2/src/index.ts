import { default as data } from "./db/shopSchedule.json";
import { getPhase1Output } from "./utils/getPhase1Output";

type ShopSchedule = {
	day: string;
	open: string;
	close: string;
};

const SHOP_SCHEDULE: ShopSchedule[] = data;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const now = new Date();

const todaysSchedule = SHOP_SCHEDULE.find(
	(schedule) => schedule.day === DAYS[now.getDay()]
);

if (todaysSchedule) {
	const [openHr, openMin] = convertTo24hrFormat(todaysSchedule.open).split(":");
	const [closeHr, closeMin] = convertTo24hrFormat(todaysSchedule.close).split(
		":"
	);
	const openDateTime = convertTimeToDate(now, openHr, openMin);
	const closeDateTime = convertTimeToDate(now, closeHr, closeMin);
	const nowDateTime = convertTimeToDate(
		now,
		now.getHours().toString(),
		now.getMinutes().toString()
	);

	console.log(
		"phase 1: ",
		getPhase1Output(nowDateTime, openDateTime, closeDateTime)
	);
}

function convertTo24hrFormat(timeIn12hrFormat: string) {
	const [hr, min, amOrPm] = timeIn12hrFormat.split(/[ :]/);
	let newHr: string;
	switch (amOrPm) {
		case "AM":
			if (hr === "12") {
				newHr = "00";
			} else {
				newHr = hr;
			}
			break;
		case "PM":
			if (hr === "12") {
				newHr = hr;
			} else {
				newHr = (parseInt(hr) + 12).toString();
			}
			break;
		default:
			throw new Error("wrong time format");
	}
	return `${newHr}:${min}`;
}

function convertTimeToDate(now: Date, hr: string, min: string): Date {
	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		parseInt(hr),
		parseInt(min)
	);
}
