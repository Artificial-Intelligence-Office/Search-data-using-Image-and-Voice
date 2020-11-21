'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var translateText = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(phrase) {
    var translate, inputLanguage, target, translatedText;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            translate = new _translate2.default({
              keyFilename: './proxym-dm24-7-4e607964c153.json'
            });
            inputLanguage = null;
            _context.next = 4;
            return translate.detect(phrase).then(function (results) {
              var detections = results[0];
              detections = Array.isArray(detections) ? detections : [detections];

              detections.forEach(function (detection) {
                inputLanguage = detection.language;
              });
            }).catch(function (err) {
              console.error('ERROR:', err);
            });

          case 4:
            target = 'en';
            translatedText = null;
            _context.next = 8;
            return translate.translate(phrase, target).then(function (results) {
              var translations = results[0];
              translations = Array.isArray(translations) ? translations : [translations];

              translations.forEach(function (translation, i) {
                translatedText = translation;
              });
            }).catch(function (err) {
              console.error('ERROR:', err);
            });

          case 8:
            return _context.abrupt('return', {
              inputLanguage: inputLanguage,
              translatedText: translatedText
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function translateText(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _translate = require('@google-cloud/translate');

var _translate2 = _interopRequireDefault(_translate);

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

exports.default = translateText;