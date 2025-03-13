console.clear();
if (process.argv[2] === "--help") {
	console.log(`

    provide following command line arguments

    [1] CURRENT_TIME          : Current Time / Dynamic input
    [2] CURRENT_TIMEZONE      : <Timezone of the CURRENT_TIME>
    [3] CONVERT_TO_TIMEZONE   : <Timezone which wanted to convert to>

    separate the args by space

    Sample Usage:

    node index.js '12:00 AM' 'IST' 'PT'

    Output:
    CONVERTED_TIME '10:30 AM'

  `);
	return;
}

const convertToTimezone = process.argv[4] || "PT";
const currentTimezone = process.argv[3] || "IST";
const currentTime =
	process.argv[2] ||
	new Date(Date.now()).toLocaleString("en-US", {
		hour: "numeric",
		hour12: true,
		minute: "numeric",
		timeZone: currentTimezone,
	});
