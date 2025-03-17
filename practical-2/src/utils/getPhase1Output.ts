export function getPhase1Output(
	nowDateTime: Date,
	openDateTime: Date,
	closeDateTime: Date
) {
	if (nowDateTime >= openDateTime && nowDateTime <= closeDateTime) {
		return "OPEN";
	} else {
		return "CLOSE";
	}
}
