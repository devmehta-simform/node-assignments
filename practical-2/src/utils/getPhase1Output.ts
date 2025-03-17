import { convertTo24hrFormat } from "./convertTo24hrFormat";

export function getPhase1Output(
	now: Date,
	DaysOfWeek: readonly string[],
	ShopSchedule: readonly ShopSchedule[]
) {
	const todaysSchedule = ShopSchedule.find(
		(s) => s.day === DaysOfWeek[now.getDay()]
	);

	if (todaysSchedule) {
		const [openHr] = convertTo24hrFormat(todaysSchedule.open);
		const [closeHr] = convertTo24hrFormat(todaysSchedule.close);

		if (
			now.getHours() >= parseInt(openHr) &&
			now.getHours() <= parseInt(closeHr)
		) {
			return "OPEN";
		} else {
			return "CLOSE";
		}
	} else {
		return "CLOSE";
	}
}
