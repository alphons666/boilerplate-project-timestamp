// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const INVALID_DATE = "Invalid Date"
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api/timestamp/:date_string?', (req, res) => {
  console.log(`${req.method}  ${req.path} ${JSON.stringify(req.params)}`)
  
  let {date_string: date} = req.params, now = new Date(), d = new Date(date)
  
  if(!date)
    now = new Date()
  else if(/^-?\d{1,18}$/.test(date))
    now = new Date(parseInt(date))
  else if(d.toString() === INVALID_DATE)
    return res.json({ error: INVALID_DATE })
  else
    now = d
  res.json({unix: now * 1, utc: now.toUTCString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
