"use strict";

// console.log(services);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault2(_regenerator);

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIndex = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _request2.default.put("http://localhost:9200/dmsearch", {
                json: {
                  settings: {
                    analysis: {
                      analyzer: {
                        en_syn_analyzer: {
                          type: "custom",
                          tokenizer: "standard",
                          filter: ["lowercase", "english_stop", "asciifolding", "custom_synonym", "keyword_repeat", "porter_stem", "custom_synonym", "unique"]
                        },
                        en_analyzer: {
                          type: "custom",
                          tokenizer: "standard",
                          filter: ["lowercase", "english_stop", "asciifolding", "keyword_repeat", "porter_stem", "unique"]
                        },
                        ar_analyzer: {
                          type: "custom",
                          tokenizer: "standard",
                          filter: ["arabic_stop", "keyword_repeat", "arabic_stemmer"]
                        }
                      },
                      filter: {
                        english_stop: {
                          type: "stop",
                          stopwords: "_english_"
                        },
                        arabic_stop: {
                          type: "stop",
                          stopwords: "_arabic_"
                        },
                        arabic_stemmer: {
                          type: "stemmer",
                          language: "arabic"
                        },
                        custom_synonym: {
                          type: "synonym",
                          synonyms_path: "synonyms.txt"
                        }
                      }
                    }
                  },
                  mappings: {
                    doc: {
                      properties: {
                        service_title_en: {
                          type: "string",
                          copy_to: "en_synonyms",
                          analyzer: "en_analyzer",
                          search_analyzer: "en_analyzer"
                        },
                        description_en: {
                          type: "string",
                          copy_to: "en_synonyms",
                          analyzer: "en_analyzer",
                          search_analyzer: "en_analyzer"
                        },
                        tags_en: {
                          type: "string",
                          copy_to: "en_synonyms",
                          analyzer: "en_analyzer",
                          search_analyzer: "en_analyzer"
                        },
                        serviceEN: {
                          type: "string",
                          analyzer: "en_analyzer",
                          search_analyzer: "en_analyzer"
                        },
                        organization_unit_en: {
                          type: "string",
                          analyzer: "en_analyzer",
                          search_analyzer: "en_analyzer"
                        },
                        en_synonyms: {
                          type: "string",
                          analyzer: "en_syn_analyzer",
                          search_analyzer: "en_syn_analyzer"
                        },
                        service_title_ar: {
                          type: "string",
                          analyzer: "ar_analyzer"
                        },
                        description_ar: {
                          type: "string",
                          analyzer: "ar_analyzer"
                        },
                        tags_ar: {
                          type: "string",
                          analyzer: "ar_analyzer"
                        },
                        serviceAR: {
                          type: "string",
                          analyzer: "ar_analyzer"
                        },
                        organization_unit_ar: {
                          type: "string",
                          analyzer: "ar_analyzer"
                        }
                      }
                    }
                  }
                }
              }, function (error, res, body) {
                if (!error) {
                  console.log("statusCode: " + res.statusCode);
                  console.log(body);
                  resolve();
                } else {
                  reject(error);
                }
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createIndex() {
    return _ref.apply(this, arguments);
  };
}();

var checkIndex = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var i;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createIndex();

          case 2:
            i = 0;

            (0, _lodash.map)(_incidentsWithCategories2.default, function (service) {
              i++;
              _request2.default.put("http://localhost:9200/my_index/doc/" + i, {
                json: service
              }, function (error, res, body) {
                if (error) {
                  console.error(error);
                  return;
                }
                console.log("statusCode: " + res.statusCode);
                console.log(body);
              });
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function checkIndex() {
    return _ref2.apply(this, arguments);
  };
}();

// createIndex();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _lodash = require("lodash");

var _incidentsWithCategories = require("./src/data/incidentsWithCategories.json");

var _incidentsWithCategories2 = _interopRequireDefault(_incidentsWithCategories);

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

checkIndex();