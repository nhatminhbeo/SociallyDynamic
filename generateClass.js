var models = require("./logic/general");
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('classes.json', 'utf8'));

models.Class.remove().exec()
.then(function() {
	console.log("PROCESSING");
	return models.Promise.each(obj, function (Class) {
		var post = models.Class({
			Name: Class.code.toUpperCase()
		});
		return post.save();
	});
}).then(function() {
	return console.log("OK");
}).then(null, function() {
	return console.log("NOT OK");
});