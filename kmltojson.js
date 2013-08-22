var http = require('http')
	, fs = require('fs')
	,	parseString = require('xml2js').parseString;

var xml = "<root>Hello xml2js!</root>"

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'fhy2.wra.gov.tw',
  path: '/PUB_WEB_2011/kml/WRAWarm.kml'
};

http.request(options, function (res) {
	var kml = '';
	res.on('data', function(chunk) {
		kml += chunk;
	});
	res.on('end', function () {
		parseString(kml, function (err, result) {
			fs.writeFile("WRAWarm.json", JSON.stringify(result), function(err) {
    		if(err) {
     		  console.log(err);
    		} else {
        	console.log("The file was saved!");
    		}	
			}); 
		});
	})
}).end();
