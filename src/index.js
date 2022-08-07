const fs = require('fs');
const trackingListString = fs.readFileSync('../track.json');

let trackList;

try {
	trackList = JSON.parse(trackingListString);
} catch (e) {
	console.log("Failed to parse tracking.json");
	console.log(e);
	process.exit(-1);
}

function containsDuplicate(arr, duplicates) {
	const unique = new Map;
	for (const item of arr) {
		const key = `${item.Owner}/${item.Name}`;
		if (!unique.has(key)) {
			unique.set(key, 1)
		} else {
			unique.set(key, unique.get(key) + 1);
		}

		if (unique.get(key) == 2) {
			duplicates.push(key)
		}

	}

	return duplicates.length > 0;
}


let duplicates = [];

if (containsDuplicate(trackList, duplicates)) {
	console.log("Duplicate repository entries found!");
	console.log(duplicates.join("\n"));
	process.exit(-1);
}
process.exit(0);

