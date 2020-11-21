'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
	value: true
});

var SpeechToText = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(inputMedia, lang, requestFrom, platform) {
		var client, audioFileName, res, encoding, sampleRateHertz, languageCode, config, audio, request, voiceText;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						if (!(requestFrom !== 'api')) {
							_context.next = 2;
							break;
						}

						return _context.abrupt('return');

					case 2:
						// Creates a client
						client = new speech.SpeechClient({
							keyFilename: './proxym-dm24-7-4e607964c153.json'
						});
						audioFileName = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').replace(/\:/g, '_').replace(' ', '_');
						_context.prev = 4;
						_context.next = 7;
						return writeMyFile('uploads/audio/' + audioFileName + (platform === 'android' ? '.amr' : '.wav'), inputMedia, 'base64');

					case 7:
						res = _context.sent;
						_context.next = 13;
						break;

					case 10:
						_context.prev = 10;
						_context.t0 = _context['catch'](4);

						console.error("@SpeechToText - writeMyFile:", _context.t0);

					case 13:
						encoding = platform === 'android' ? 'AMR_WB' : 'LINEAR16';
						sampleRateHertz = 16000;
						languageCode = lang;
						config = {
							encoding: encoding,
							sampleRateHertz: sampleRateHertz,
							languageCode: languageCode,
							model: 'command_and_search'
						};
						audio = {
							content: inputMedia
						};
						request = {
							config: config,
							audio: audio
						};
						voiceText = null;

						// Detects speech in the audio file

						_context.prev = 20;
						_context.next = 23;
						return client.recognize(request).then(function (data) {
							var response = data[0];
							var transcription = response.results.map(function (result) {
								return result.alternatives[0].transcript;
							}).join('\n');
							console.log('Transcription: ', transcription);
							voiceText = transcription;
						}).catch(function (err) {
							console.error('ERROR:', err);
						});

					case 23:
						_context.next = 29;
						break;

					case 25:
						_context.prev = 25;
						_context.t1 = _context['catch'](20);

						console.error("@SpeechToText - recognize:", _context.t1);
						return _context.abrupt('return');

					case 29:
						return _context.abrupt('return', voiceText);

					case 30:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this, [[4, 10], [20, 25]]);
	}));

	return function SpeechToText(_x2, _x3, _x4, _x5) {
		return _ref.apply(this, arguments);
	};
}();

var _fs = require('fs');

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

var speech = require('@google-cloud/speech');

var writeMyFile = function writeMyFile(path, data) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "utf8";
	return new Promise(function (res, rej) {
		_fs2.default.writeFile(path, data, opts, function (err) {
			if (err) rej(err);else res();
		});
	});
};

exports.default = SpeechToText;