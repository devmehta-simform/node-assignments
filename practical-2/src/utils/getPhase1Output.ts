export function getPhase1Output(
	nowDateTime: any,
	openDateTime: any,
	closeDateTime: any
) {
	if (nowDateTime >= openDateTime && nowDateTime <= closeDateTime) {
		return "OPEN";
	} else {
		return "CLOSE";
	}
}
