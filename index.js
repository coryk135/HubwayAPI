var express = require('express'),
    app = express(),
    request  = require('request'),
    parser = require('xml2json'),
    path = require('path');

var url = 'http://www.thehubway.com/data/stations/bikeStations.xml';

function getXML(uri, cb) {
    request(
        { uri:uri }, 
        function (error, response, body) {                    
            if (error && response.statusCode !== 200) { 
                console.log('Error when contacting ', uri);
                cb(error);
            } else {
                cb(null, body);
            }
    });
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', function(req, res) {
  getXML(url, function(err, body) {
    if(err) {
      res.status(500).send('Something went wrong.');
    } else {
      res.json(JSON.parse(parser.toJson(body)));
    }
  });
});

app.get('/', function(req, res) {
  res.send();
});

app.listen(8888, function(){
  console.log('Express server listening on port 8888');
})
