"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
	value: true
});

var detectLabels = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(photo, requestFrom) {
		var client, photoName, res, fileName, extractedLabels;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						console.log('===========================================================', requestFrom);

						// Creates a client
						client = new _vision2.default.ImageAnnotatorClient({
							keyFilename: "./proxym-dm24-7-4e607964c153.json"
						});
						photoName = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "").replace(/\:/g, "_").replace(" ", "_");
						_context.prev = 3;
						_context.next = 6;
						return writeMyFile("uploads/photos/" + photoName + "." + photo.substring(photo.indexOf('/') + 1, photo.indexOf(';')), photo.substr(photo.indexOf(',') + 1), "base64");

					case 6:
						res = _context.sent;
						_context.next = 12;
						break;

					case 9:
						_context.prev = 9;
						_context.t0 = _context["catch"](3);

						console.error("@PhotoToText - writeMyFile:", _context.t0);

					case 12:
						fileName = "uploads/photos/" + photoName + "." + photo.substring(photo.indexOf('/') + 1, photo.indexOf(';'));
						extractedLabels = [];
						_context.prev = 14;
						_context.next = 17;
						return client.labelDetection(fileName).then(function (results) {
							var labels = results[0].labelAnnotations;
							console.log("Labels:");
							labels.forEach(function (label) {
								console.log(label);
								extractedLabels.push(label.description);
							});
						}).catch(function (err) {
							console.error("ERROR:", err);
						});

					case 17:
						_context.next = 22;
						break;

					case 19:
						_context.prev = 19;
						_context.t1 = _context["catch"](14);

						console.error("@PhotoToText - labelDetection:", _context.t1);

					case 22:
						return _context.abrupt("return", extractedLabels.join(" "));

					case 23:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this, [[3, 9], [14, 19]]);
	}));

	return function detectLabels(_x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var _vision = require("@google-cloud/vision");

var _vision2 = _interopRequireDefault(_vision);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

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

var writeMyFile = function writeMyFile(path, data) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "utf8";
	return new Promise(function (res, rej) {
		_fs2.default.writeFile(path, data, opts, function (err) {
			if (err) rej(err);else res();
		});
	});
};

exports.default = detectLabels;