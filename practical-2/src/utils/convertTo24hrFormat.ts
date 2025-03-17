export function convertTo24hrFormat(timeIn12hrFormat: string) {
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
	return [newHr, min];
}
