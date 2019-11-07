var express = require('express');
var app = express();
var path = require('path');
var open = require('open');
const fetch = require("node-fetch");

const port = 8000;
const openWeatherID = '1d31ad7445684e2a19e03b3f44fa6618';

// __dirname will use the current path from where you run this file 
function allowCrossDomain (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

async function grabWeather(ZIPCode, countryCode){

	const url = 'http://api.openweathermap.org/data/2.5/weather?zip='+ZIPCode+','+ countryCode + '&APPID=' + openWeatherID;
	try {
		const response = await fetch(url);

		if (response.status != 200){
			return 'Error in sending API request.\n\nError message: ' + response.statusText + ', HTTP status: ' + response.status;
		}

		else{
			const json = await response.json();
			return json;
		}
  	} catch (error) {
    	console.log(error);
  	}
};

app.use(allowCrossDomain)

app.use('/', express.static(`${__dirname}`))
app.use(express.static(path.join(__dirname, 'css')));

app.post('/weather', async (req, res) => {
	var body = '';

	await req.on('data', async data => {
		body += await data;
	})

	await req.on('end', async () => { })

	body = JSON.parse(body);
	var ZIPCode = await body.ZIPCode;
	var countryCode = await body.countryCode;

	try{
		var weatherData = await grabWeather(ZIPCode, countryCode);
		res.send(weatherData);
	} catch (error){
		console.log(error);
		res.send(error);
	}
})

app.listen(port, async (err) => {
  if (err) { console.error('Something bad happened', err) }

  console.log(`App running at: http://localhost:${port}`)

  await open(`http://localhost:${port}`)
})