var express  = require('express');
var app = express();
var morgan = require('morgan');             // middleware to log http requests
var port = process.env.PORT || 5500;
var bodyParser = require('body-parser');
var router = express.Router();
var apiRoutes = require('./app/api')(router);
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
// diff. front end and backend routes
app.use('/api', apiRoutes);

// index page
app.get('*', function (req,res) {
    res.send('Welcome to Udayy SubtractionOnTheGo! Try /api/subtraction API.');
});

// server listening on port 8080
app.listen(port, function () {
    console.log('Server running on port ' + port);
});
