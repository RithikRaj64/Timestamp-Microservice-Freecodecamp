// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

let obj = {};

app.get("/api/:input", (req, res) => {
  dateInput = req.params.input;

  try {
    obj.unix = new Date(dateInput).getTime();
    obj.utc = new Date(dateInput).toUTCString();

    if (!obj.unix || !obj.utc) {
      throw new Error("Invalid Date");
    }

    res.json(obj);
    return;
  } catch (e) {
    try {
      obj.unix = new Date(parseInt(dateInput)).getTime();
      obj.utc = new Date(parseInt(dateInput)).toUTCString();

      if (!obj.unix || !obj.utc) {
        throw new Error("Invalid Date");
      }

      res.json(obj);
      return;
    }
    catch (e) {
      res.json({ error: "Invalid Date" });
    }
  }

  res.json(obj);
})

app.get("/api", (req, res) => {
  obj.unix = new Date().getTime();
  obj.utc = new Date().toUTCString();
  res.json(obj);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
