// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  let currentTime = new Date();
  res.json({ unix: currentTime.getTime(), utc: currentTime.toUTCString() });;
});

// Route handler for /api/:date
app.get('/api/:date', (req, res) => {
  let inputDate = req.params.date;

  // Attempt to parse the inputDate
  let parsedDate = new Date(inputDate);

  if(parsedDate == 'Invalid Date'){
    let parsedDate = new Date(parseInt(inputDate));
    // Check if the parsedDate is valid
    if (isNaN(parsedDate)) {
        res.json({ error: 'Invalid Date' });
        
  }else{res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });}

  } else {res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
  }
});

// API date input 
/*app.get("/api/:date?", function (req, res) {

console.log(req.params.date);
let inputDate = req.params.date;

if (inputDate = ""){
  let d = Date.now();
  let utcDate = inputDate.toUTCString();
  let unixDate = Date.parse(utcDate)
  res.json({unix: unixDate, utc:utcDate});}

else{
  let DateObj = new Date(inputDate);

  if (!isNaN(inputDate)) {
    console.log('Das Datum ist gültig.');

    let utcDate = DateObj.toUTCString();
    let unixDate = Date.parse(utcDate)
    res.json({unix: unixDate, utc:utcDate});
  } else {
    res.json({error: "Invalid Date"});
  }}
  
  //
});*/


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
