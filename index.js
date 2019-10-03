'use strict';

let express = require('express')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ scores: [] }).write()

// create an express app
let app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/PlayTheGame', function (req, res) {
  res.sendFile(path.join(__dirname + '/gameplay.html'));
});

router.get('/GameDesign', function (req, res) {
  res.sendFile(path.join(__dirname + '/gameDesign.html'));
});

router.get('/Credits', function (req, res) {
  res.sendFile(path.join(__dirname + '/credits.html'));
});
//add the router
app.use(express.static(__dirname));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/js'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);

app.get("/top_scores/:count", function (request, response) {
  let count = request.params.count;
  let topScores = db.get('scores')
    .orderBy(['score'], ['desc'])
    .take(count)
    .value();

  response.send(topScores);
})

app.use(express.json({ strict: false }));
app.post('/add_score', function (req, res) {
  let nameVal = req.body.name;
  let scoreVal = req.body.score;

  db.get('scores').push({ name: nameVal, score: scoreVal }).write();
  res.send('OK');
});

// start the server on port 8080
app.listen(8080);
// send a message
console.log('Server has started!');
