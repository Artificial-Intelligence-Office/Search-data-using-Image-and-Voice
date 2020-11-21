'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vm = require('vm');

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var routes = function routes(app) {
    app.route('/search').post(_app2.default);
};

exports.default = routes;