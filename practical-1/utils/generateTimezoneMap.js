import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
export default (() => {
	const dbDirPath = path.resolve("db");
	const dbFilePath = path.resolve(dbDirPath, "db.json");
	if (!existsSync(dbDirPath)) mkdirSync(dbDirPath);
	if (!existsSync(dbFilePath)) {
		const userTimezones = Intl.supportedValuesOf("timeZone");
		const mapAbbr = {};
		userTimezones.forEach((tz) => {
			const formatter = new Intl.DateTimeFormat("en-US", {
				timeZoneName: "long",
				timeZone: tz,
			});
			const parts = formatter.formatToParts(new Date());
			const timeZone = parts.find((part) => part.type === "timeZoneName").value;
			const abbr = timeZone
				.split(" ")
				.map(([F]) => F)
				.join("");
			if (mapAbbr[abbr]) mapAbbr[abbr].push(tz);
			else mapAbbr[abbr] = [tz];
		});
		writeFileSync(dbFilePath, JSON.stringify(mapAbbr));
	}
})();
