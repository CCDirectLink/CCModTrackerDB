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

function isValueCorrect(arr, incorrect) {
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (item.Owner == null || item.Owner == "") {
			incorrect.push(`Entry ${i} has an invalid Owner`);
		}

		if(item.Repo == null || item.Repo == "") {
			incorrect.push(`Entry ${i} has an invalid Repo`);
		}
	
		if(item.Id == null || item.Id == "") {
			incorrect.push(`Entry ${i} has an invalid Id`);
		}
	}
	return incorrect.length === 0;
}


function containsDuplicate(arr, duplicates) {
	const unique = new Map;
	for (const item of arr) {
		const key = `${item.Owner}/${item.Repo}`;
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

let incorrect = [];
if (!isValueCorrect(trackList, incorrect)) {
	console.log("There were issues with some entries...");
	console.log(incorrect.join("\n"));
	process.exit(-1);
}

console.log("Looks all good!");
process.exit(0);

