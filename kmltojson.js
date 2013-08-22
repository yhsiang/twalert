var http = require('http')
	, fs = require('fs')
	,	parseString = require('xml2js').parseString;

function kml2json (url) {
	host = url.split('/')[2];
	path = url.split(host)[1];
	if(url.match(/\.kml/))
		fileName = path.match(/\w+\.kml/)[0].split('.kml')[0]+'.json';
	else
		fileName = path.match(/\w+\.ashx/)[0].split('.ashx')[0]+'.json';
var options = {
  host: host,
  path: path
};

http.request(options, function (res) {
	var kml = '';
	res.on('data', function(chunk) {
		kml += chunk;
	});
	res.on('end', function () {
		kml = kml.replace("\ufeff", "");
		//kml = kml.replace('<kml>', '<kml xmlns="http://earth.google.com/kml/2.1">');		
		
		parseString(kml, function (err, result) {
			fs.writeFile(fileName, JSON.stringify(result), function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log("The "+fileName+" was saved!");
				}	
			});
		});
		//*/
	})
}).end();
//*/
}

//kml2json('http://fhy2.wra.gov.tw/PUB_WEB_2011/kml/WRAWarm.kml');
kml2json('http://fhy.wra.gov.tw/DMCHY/DES/KMLFiles/NewstWaterWarm.kml');
//kml2json('http://fema1.swcb.gov.tw/google/DebrisAlert.ashx');
//kml2json('http://fema1.swcb.gov.tw/google/DebrisAlertRed.ashx');
//*/