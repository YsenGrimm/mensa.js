var cheerio = require("cheerio");
var request = require("request");
var program = require("commander");
var Table = require("cli-table");

program
	.version("1.0.0")
	.option("unten", "Essensplan vom unteren Speisesaal")
	.option("oben", "Essensplan vom oberen Speisesaal")
	.parse(process.argv);

var table = new Table();

var room;

if (program.unten) {
	room = "unten";
} else if (program.oben) {
	room = "oben";
} else {
	room = "unten";
}

request("http://www.studentenwerk-magdeburg.de/mensen-cafeterien/mensa-unicampus/speiseplan-" +
	room + "/", function(error, response, body) {

	if (!error) {
		var $ = cheerio.load(body);
		var date = $(".mensa").children().find("tbody")[0].children;
		for (var i = 0; i < date.length-1; i++) {
			table.push([date[i].children[0].children[0].children[0].data]);
		}
		console.log(table.toString());
	} else {
		console.log("You might not be connected to the internet, mabey the wifi crashed again?")
	}


})
