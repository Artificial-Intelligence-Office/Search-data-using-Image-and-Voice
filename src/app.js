'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _PhotoToText = require('./controllers/PhotoToText');

var _PhotoToText2 = _interopRequireDefault(_PhotoToText);

var _SpeechToText = require('./controllers/SpeechToText');

var _SpeechToText2 = _interopRequireDefault(_SpeechToText);

var _KeywordsExtractor = require('./controllers/KeywordsExtractor');

var _KeywordsExtractor2 = _interopRequireDefault(_KeywordsExtractor);

var _FuzzySearch = require('./controllers/FuzzySearch');

var _FuzzySearch2 = _interopRequireDefault(_FuzzySearch);

var _Translate = require('./controllers/Translate');

var _Translate2 = _interopRequireDefault(_Translate);

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

function isArabic(text) {
	var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
	return pattern.test(text);
}

var findServices = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
		var inputMedia, mediaType, requestFrom, platform, lang, originalPhrase, phrase, _ref2, translatedText, keywords, foundServices, _fullFoundServices, resFound, html, i;

		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						inputMedia = req.body.searchRequest ? req.body.searchRequest : req.body.fileName;
						mediaType = req.body.mediaType;
						requestFrom = req.body.requestFrom === 'api' ? 'api' : 'web';
						platform = req.body.platform === 'iphone' ? 'iphone' : 'android';
						lang = req.body.lang;

						console.log('================ searchRequest :', inputMedia);
						console.log('==================== mediaType :', mediaType);
						console.log('================ requestFormat :', requestFrom);
						console.log('===================== platform :', platform);
						console.log('========================= lang :', lang);

						// console.log(getMatchingServices('  My air   conditioner     is  broken  .'));

						originalPhrase = null;
						;

						if (!(inputMedia && mediaType)) {
							_context.next = 105;
							break;
						}

						phrase = null;
						_context.t0 = mediaType;
						_context.next = _context.t0 === 'text' ? 17 : _context.t0 === 'audio' ? 20 : _context.t0 === 'speech' ? 31 : _context.t0 === 'photo' ? 44 : 55;
						break;

					case 17:
						originalPhrase = inputMedia;
						phrase = (0, _lodash.lowerCase)(inputMedia);
						return _context.abrupt('break', 56);

					case 20:
						_context.prev = 20;
						_context.next = 23;
						return (0, _SpeechToText2.default)(inputMedia, lang, requestFrom, platform);

					case 23:
						originalPhrase = _context.sent;
						_context.next = 29;
						break;

					case 26:
						_context.prev = 26;
						_context.t1 = _context['catch'](20);

						console.error("@audio:", _context.t1);

					case 29:

						phrase = (0, _lodash.lowerCase)(originalPhrase);
						return _context.abrupt('break', 56);

					case 31:
						_context.prev = 31;
						_context.next = 34;
						return (0, _SpeechToText2.default)(inputMedia, lang, requestFrom, platform);

					case 34:
						originalPhrase = _context.sent;
						_context.next = 40;
						break;

					case 37:
						_context.prev = 37;
						_context.t2 = _context['catch'](31);

						console.error("@speech:", _context.t2);

					case 40:

						phrase = (0, _lodash.lowerCase)(originalPhrase);
						res.send({
							services: [],
							requestText: originalPhrase
						});
						return _context.abrupt('return');

					case 44:
						_context.prev = 44;
						_context.next = 47;
						return (0, _PhotoToText2.default)(inputMedia, requestFrom);

					case 47:
						originalPhrase = _context.sent;
						_context.next = 53;
						break;

					case 50:
						_context.prev = 50;
						_context.t3 = _context['catch'](44);

						console.error("@photo:", _context.t3);

					case 53:

						phrase = (0, _lodash.lowerCase)(originalPhrase);
						return _context.abrupt('break', 56);

					case 55:
						throw Error('ERROR: input media type is unrecognized');

					case 56:

						// console.log('phrase : ', phrase);

						if (phrase.length < 1) {
							console.log('If ');
							res.send({
								services: _fullFoundServices,
								requestText: originalPhrase
							});
						}

						// let translatedText = null;

						if (!isArabic(phrase)) {
							_context.next = 70;
							break;
						}

						_context.prev = 58;
						_context.next = 61;
						return (0, _Translate2.default)(phrase);

					case 61:
						_ref2 = _context.sent;
						translatedText = _ref2.translatedText;
						_context.next = 68;
						break;

					case 65:
						_context.prev = 65;
						_context.t4 = _context['catch'](58);

						console.error("@translating:", _context.t4);

					case 68:

						console.log('​findServices -> translatedText', translatedText);
						phrase = translatedText;

					case 70:

						// phrase = SpellCheck(phrase);

						keywords = (0, _KeywordsExtractor2.default)(phrase + ' ' + originalPhrase);

						console.log('KEYWORDS LENGTH:', keywords.length);

						if (!(keywords.length > 0)) {
							_context.next = 76;
							break;
						}

						console.log('keywords : ', keywords);
						_context.next = 80;
						break;

					case 76:
						console.error('Nothing !!!');
						if (requestFrom === 'api') {
							res.send({
								services: [],
								requestText: ''
							});
						} else {
							res.send('<h1>Nothing to search for, please verify that you have made a correct search request</h1>');
						}
						console.log('I could not understand your request, please try again !');
						return _context.abrupt('return');

					case 80:
						foundServices = [];
						_fullFoundServices = [];
						resFound = null;
						_context.prev = 83;
						_context.next = 86;
						return (0, _FuzzySearch2.default)(phrase, keywords);

					case 86:
						resFound = _context.sent;
						_context.next = 92;
						break;

					case 89:
						_context.prev = 89;
						_context.t5 = _context['catch'](83);

						console.error("@getServices:", _context.t5);

					case 92:

						console.log('MESSAGE:', resFound.status);

						if (!resFound.status) {
							_context.next = 98;
							break;
						}

						res.send({
							error: resFound.message,
							services: [],
							requestText: []
						});
						return _context.abrupt('return');

					case 98:
						(0, _lodash.map)(resFound, function (service) {
							foundServices.push(lang === 'ar' ? service.service_title_ar : service.service_title_en);
							_fullFoundServices.push(service);
						});

					case 99:

						console.log('foundServices', foundServices);
						// console.log('fullFoundServices', fullFoundServices);

						html = null;

						if (requestFrom !== 'api') {
							(0, _lodash.map)(foundServices);
							html = '<div style="font-size: 16px; font-size: 4vw; color: #AF0029; text-align: center"><ol>';

							for (i = 0; i < foundServices.length; i++) {
								html += '<li>' + foundServices[i] + '</li>';
							}

							html += '</ol></div>';
						}

						if (requestFrom === 'api') {
							res.send({
								services: _fullFoundServices,
								requestText: originalPhrase
							});
						} else {
							res.send(html);
						}

						_context.next = 107;
						break;

					case 105:
						if (requestFrom === 'api') {
							res.send({
								services: [],
								requestText: ''
							});
						} else {
							res.send('<h1>Nothing to search for, please verify that you have made a correct search request</h1>');
						}

						console.log('Nothing to search for, please verify that you have made a correct search request');

					case 107:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined, [[20, 26], [31, 37], [44, 50], [58, 65], [83, 89]]);
	}));

	return function findServices(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

exports.default = findServices;