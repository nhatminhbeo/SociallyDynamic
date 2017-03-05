var models = require("./logic/general");
var fs = require("fs");
var obj = JSON.parse(fs.readFileSync("data/json/majors.json", 'utf8'));

models.Major.remove().exec()
.then(function() {
	console.log("PROCESSING");
	return models.Promise.each(obj, function (Major) {
		return models.Major({
			MajorName: Major
		}).save();
	});
}).then(function() {
	return console.log("OK");
}).then(null, function() {
	return console.log("NOT OK");
});