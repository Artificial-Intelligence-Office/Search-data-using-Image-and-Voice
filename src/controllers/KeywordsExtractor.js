'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _retext = require('retext');

var _retext2 = _interopRequireDefault(_retext);

var _retextKeywords = require('retext-keywords');

var _retextKeywords2 = _interopRequireDefault(_retextKeywords);

var _nlcstToString = require('nlcst-to-string');

var _nlcstToString2 = _interopRequireDefault(_nlcstToString);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function KeywordsExtractor(request) {
    console.log('request ' + request);
    var words = [];

    if (request.replace(/\s/g, '').length < 1) {
        console.error('Request is empty');
        return;
    } else {
        (0, _retext2.default)().use(_retextKeywords2.default).process(request, function (err, file) {
            if (err) throw err;

            file.data.keywords.forEach(function (keyword) {
                words.push((0, _nlcstToString2.default)(keyword.matches[0].node));
            });
        });

        var reqs = request.split(' ');

        for (var i = 0; i < reqs.length; i++) {
            if (words.indexOf(reqs[i]) == -1) {
                words.push(reqs[i]);
            }
        }
        return words;
    }
}

exports.default = KeywordsExtractor;