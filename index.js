'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Routes = require('./src/routes/Routes');

var _Routes2 = _interopRequireDefault(_Routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
var PORT = process.argv[2] ? process.argv[2] : 9090;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: true }));

(0, _Routes2.default)(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/');
});

app.use('/public/img', _express2.default.static('webimg'));
app.use('/public/js', _express2.default.static('webjs'));
// app.use('/examples', express.static('examples'));

app.get('/record', function (req, res) {
    res.sendFile(__dirname + '/record.html');
});

var server = app.listen(PORT, function () {
    console.log('Your server is running on port ' + PORT);
});

// server.timeout = 15000;