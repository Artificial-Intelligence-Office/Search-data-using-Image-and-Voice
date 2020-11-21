'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
	value: true
});

var getServices = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(phrase, keywords) {
		var client, response, resp;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						client = new elasticsearch.Client({
							host: 'localhost:9200'
							// log: 'trace'
						});

						// FIXME :!! keywords have to be escaped to avoid elastic injection !!

						_context.prev = 1;
						_context.next = 4;
						return client.search({
							index: 'my_index',
							body: {
								query: {
									query_string: {
										query: keywords.join(' '),
										fields: ["service_title_en^25", "description_en^10", "serviceEN^5", "tags_en^10", "service_title_ar^25", "description_ar^10", "serviceAR^5", "tags_ar^10", "en_synonyms^2", "organization_unit_en^2", "organization_unit_ar^2"]
										// fields: ["service_title_en^15"]
									}
								}
							}
						});

					case 4:
						response = _context.sent;
						resp = response.hits.hits.map(function (obj) {
							return obj['_source'];
						});
						return _context.abrupt('return', resp);

					case 9:
						_context.prev = 9;
						_context.t0 = _context['catch'](1);

						console.log('=======================================================');
						console.log(_context.t0);
						console.log('=======================================================');
						return _context.abrupt('return', _context.t0);

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[1, 9]]);
	}));

	return function getServices(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

function _asyncToGenerator(fn) {
	return function () {
		var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
			function step(key, arg) {
				try {
					var info = gen[key](arg);var value = info.value;
				} catch (error) {
					reject(error);return;
				}if (info.done) {
					resolve(value);
				} else {
					return Promise.resolve(value).then(function (value) {
						step("next", value);
					}, function (err) {
						step("throw", err);
					});
				}
			}return step("next");
		});
	};
}

var elasticsearch = require('elasticsearch');

exports.default = getServices;