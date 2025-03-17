export function convertTimeToDate(now: Date, hr: string, min: string): Date {
	return new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		parseInt(hr),
		parseInt(min)
	);
}
