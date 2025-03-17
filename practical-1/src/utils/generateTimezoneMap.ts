import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
export default (() => {
	const dbDirPath = path.resolve("src/db");
	const dbFilePath = path.resolve(dbDirPath, "db.json");
	console.log(dbDirPath, dbFilePath);
	if (!existsSync(dbDirPath)) mkdirSync(dbDirPath);
	if (!existsSync(dbFilePath)) {
		const userTimezones = Intl.supportedValuesOf("timeZone");
		const mapAbbr: { [key: string]: string[] } = {};
		userTimezones.forEach((tz) => {
			/* reference: https://bito.ai/resources/javascript-get-timezone-name-javascript-explained/#:~:text=Additionally%2C%20the%20method%20getTimezoneName(),time%20in%20the%20local%20timezone. */
			const timeZoneArr = new Date()
				.toLocaleString("en-US", {
					timeZoneName: "long",
					timeZone: tz,
				})
				.split(" ");
			const timeZone = timeZoneArr.splice((timeZoneArr.length - 3) * -1);
			const abbr = timeZone.map(([F]) => F).join("");
			if (mapAbbr[abbr]) mapAbbr[abbr].push(tz);
			else mapAbbr[abbr] = [tz];
		});

		writeFileSync(dbFilePath, JSON.stringify(mapAbbr));
	}
})();
