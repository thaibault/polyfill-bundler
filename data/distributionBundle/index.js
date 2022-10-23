#!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module index */
'use strict';

// region import
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _clientnode = _interopRequireWildcard(require("clientnode"));
var _http = require("http");
var _polyfillLibrary = _interopRequireDefault(require("polyfill-library"));
var _url = _interopRequireDefault(require("url"));
var _ref2, _process$argv$;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// endregion
// region types
var Flags = ['always', 'gated'];
var UnknownTechnologyConfigurations = ['ignore', 'polyfill'];
// endregion
var instance = (0, _http.createServer)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response) {
    var queryParameter, excludes, _iterator, _step, parameter, features, _iterator2, _step2, _parameter, flags, _iterator3, _step3, _parameter2, givenUnknown, unknown, featureOptions, _iterator4, _step4, feature, _configuration, configuration;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.info('Got request url', request.url);
            if (request.url.startsWith('/polyfill.')) {
              _context.next = 6;
              break;
            }
            response.statusCode = 404;
            _context.next = 30;
            break;
          case 6:
            // region parse query parameter
            queryParameter = _url["default"].parse(request.url, true).query;
            excludes = [];
            _iterator = _createForOfIteratorHelper([].concat(queryParameter.excludes || []));
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                parameter = _step.value;
                excludes = excludes.concat(parameter.split(','));
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            features = [];
            _iterator2 = _createForOfIteratorHelper([].concat(queryParameter.features || []));
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                _parameter = _step2.value;
                features = features.concat(_parameter.split(','));
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            flags = [];
            _iterator3 = _createForOfIteratorHelper([].concat(queryParameter.flags || []));
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                _parameter2 = _step3.value;
                flags = flags.concat(_parameter2.split(',').filter(function (flagCandidate) {
                  return Flags.includes(flagCandidate);
                }));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            givenUnknown = [].concat(queryParameter.unknown || []);
            unknown = givenUnknown.length && UnknownTechnologyConfigurations.includes(givenUnknown[0]) ? givenUnknown[0] : 'polyfill'; // endregion
            // region build feature options
            featureOptions = {};
            _iterator4 = _createForOfIteratorHelper(features);
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                feature = _step4.value;
                _configuration = feature.split('|');
                featureOptions[_configuration[0]] = {
                  flags: _configuration.length > 1 ? _configuration[1] : flags
                };
              }
              // endregion
              // region build configuration and log
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            configuration = {
              excludes: excludes,
              features: featureOptions,
              minify: request.url.includes('.min.js?'),
              uaString: request.headers['user-agent'],
              unknown: unknown
            };
            console.info('Apply polyfill configuration: "' + "".concat(_clientnode["default"].represent(configuration), "\""));
            // endregion
            // region write response
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/javascript; charset=utf-8');
            _context.t0 = response;
            _context.next = 28;
            return _polyfillLibrary["default"].getPolyfillString(configuration);
          case 28:
            _context.t1 = _context.sent;
            _context.t0.write.call(_context.t0, _context.t1);
          case 30:
            _context.next = 36;
            break;
          case 32:
            _context.prev = 32;
            _context.t2 = _context["catch"](0);
            console.warn('Error occurred:', _context.t2);
            response.statusCode = 500;
          case 36:
            _context.prev = 36;
            response.end();
            return _context.finish(36);
          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 32, 36, 39]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var port = parseInt((_ref2 = (_process$argv$ = process.argv[2]) !== null && _process$argv$ !== void 0 ? _process$argv$ : process.env.POLYFILL_PORT) !== null && _ref2 !== void 0 ? _ref2 : 8080);
console.info("Listen on port ".concat(port, " for incoming requests."));
instance.listen(port);
var _iterator5 = _createForOfIteratorHelper(_clientnode.CloseEventNames),
  _step5;
try {
  var _loop = function _loop() {
    var name = _step5.value;
    process.on(name, function () {
      console.info("\nGot \"".concat(name, "\" signal: stopping server."));
      instance.close(function () {
        return console.info('Server stopped.');
      });
    });
  };
  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
    _loop();
  }
  // region vim modline
  // vim: set tabstop=4 shiftwidth=4 expandtab:
  // vim: foldmethod=marker foldmarker=region,endregion:
  // endregion
} catch (err) {
  _iterator5.e(err);
} finally {
  _iterator5.f();
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJuYW1lcyI6WyJGbGFncyIsIlVua25vd25UZWNobm9sb2d5Q29uZmlndXJhdGlvbnMiLCJpbnN0YW5jZSIsImNyZWF0ZVNlcnZlciIsInJlcXVlc3QiLCJyZXNwb25zZSIsImNvbnNvbGUiLCJpbmZvIiwidXJsIiwic3RhcnRzV2l0aCIsInN0YXR1c0NvZGUiLCJxdWVyeVBhcmFtZXRlciIsInBhcnNlIiwicXVlcnkiLCJleGNsdWRlcyIsImNvbmNhdCIsInBhcmFtZXRlciIsInNwbGl0IiwiZmVhdHVyZXMiLCJmbGFncyIsImZpbHRlciIsImZsYWdDYW5kaWRhdGUiLCJpbmNsdWRlcyIsImdpdmVuVW5rbm93biIsInVua25vd24iLCJsZW5ndGgiLCJmZWF0dXJlT3B0aW9ucyIsImZlYXR1cmUiLCJjb25maWd1cmF0aW9uIiwibWluaWZ5IiwidWFTdHJpbmciLCJoZWFkZXJzIiwiVG9vbHMiLCJyZXByZXNlbnQiLCJzZXRIZWFkZXIiLCJwb2x5ZmlsbExpYnJhcnkiLCJnZXRQb2x5ZmlsbFN0cmluZyIsIndyaXRlIiwid2FybiIsImVuZCIsInBvcnQiLCJwYXJzZUludCIsInByb2Nlc3MiLCJhcmd2IiwiZW52IiwiUE9MWUZJTExfUE9SVCIsImxpc3RlbiIsIkNsb3NlRXZlbnROYW1lcyIsIm5hbWUiLCJvbiIsImNsb3NlIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gIyEvdXNyL2Jpbi9lbnYgYmFiZWwtbm9kZVxuLy8gLSotIGNvZGluZzogdXRmLTggLSotXG4vKiogQG1vZHVsZSBpbmRleCAqL1xuJ3VzZSBzdHJpY3QnXG4vLyByZWdpb24gaW1wb3J0XG5pbXBvcnQgVG9vbHMsIHtDbG9zZUV2ZW50TmFtZXN9IGZyb20gJ2NsaWVudG5vZGUnXG5pbXBvcnQge01hcHBpbmd9IGZyb20gJ2NsaWVudG5vZGUvdHlwZSdcbmltcG9ydCB7XG4gICAgY3JlYXRlU2VydmVyIGFzIGNyZWF0ZUh0dHAyU2VydmVyLFxuICAgIEh0dHAyU2VydmVyIGFzIEh0dHBTZXJ2ZXIsXG4gICAgSHR0cDJTZXJ2ZXJSZXNwb25zZSBhcyBIVFRQU2VydmVyUmVzcG9uc2UsXG4gICAgSHR0cDJTZXJ2ZXJSZXF1ZXN0IGFzIEhUVFBTZXJ2ZXJSZXF1ZXN0XG59IGZyb20gJ2h0dHAyJ1xuaW1wb3J0IHtjcmVhdGVTZXJ2ZXJ9IGZyb20gJ2h0dHAnXG5pbXBvcnQgcG9seWZpbGxMaWJyYXJ5IGZyb20gJ3BvbHlmaWxsLWxpYnJhcnknXG5pbXBvcnQgdXJsIGZyb20gJ3VybCdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHR5cGVzXG5jb25zdCBGbGFncyA9IFsnYWx3YXlzJywgJ2dhdGVkJ10gYXMgY29uc3RcbnR5cGUgRmxhZyA9IHR5cGVvZiBGbGFnc1tudW1iZXJdXG5jb25zdCBVbmtub3duVGVjaG5vbG9neUNvbmZpZ3VyYXRpb25zID0gWydpZ25vcmUnLCAncG9seWZpbGwnXSBhcyBjb25zdFxudHlwZSBVbmtub3duVGVjaG5vbG9neUNvbmZpZ3VyYXRpb24gPVxuICAgIHR5cGVvZiBVbmtub3duVGVjaG5vbG9neUNvbmZpZ3VyYXRpb25zW251bWJlcl1cbi8vIGVuZHJlZ2lvblxuY29uc3QgaW5zdGFuY2U6SHR0cFNlcnZlciA9IChcbiAgICBjcmVhdGVTZXJ2ZXIgYXMgdW5rbm93biBhcyB0eXBlb2YgY3JlYXRlSHR0cDJTZXJ2ZXJcbikoXG4gICAgYXN5bmMgKFxuICAgICAgICByZXF1ZXN0OkhUVFBTZXJ2ZXJSZXF1ZXN0LCByZXNwb25zZTpIVFRQU2VydmVyUmVzcG9uc2VcbiAgICApOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdHb3QgcmVxdWVzdCB1cmwnLCByZXF1ZXN0LnVybClcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0LnVybC5zdGFydHNXaXRoKCcvcG9seWZpbGwuJykpXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDQwNFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcmVnaW9uIHBhcnNlIHF1ZXJ5IHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1ldGVyID0gdXJsLnBhcnNlKHJlcXVlc3QudXJsLCB0cnVlKS5xdWVyeVxuXG4gICAgICAgICAgICAgICAgbGV0IGV4Y2x1ZGVzOkFycmF5PHN0cmluZz4gPSBbXVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIChbXSBhcyBBcnJheTxzdHJpbmc+KS5jb25jYXQoXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVyLmV4Y2x1ZGVzIHx8IFtdXG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZXMgPSBleGNsdWRlcy5jb25jYXQocGFyYW1ldGVyLnNwbGl0KCcsJykpXG5cbiAgICAgICAgICAgICAgICBsZXQgZmVhdHVyZXM6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgKFtdIGFzIEFycmF5PHN0cmluZz4pLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbWV0ZXIuZmVhdHVyZXMgfHwgW11cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcyA9IGZlYXR1cmVzLmNvbmNhdChwYXJhbWV0ZXIuc3BsaXQoJywnKSlcblxuICAgICAgICAgICAgICAgIGxldCBmbGFnczpBcnJheTxGbGFnPiA9IFtdXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgb2YgKFtdIGFzIEFycmF5PHN0cmluZz4pLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbWV0ZXIuZmxhZ3MgfHwgW11cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICAgICAgICBmbGFncyA9IGZsYWdzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZmxhZ0NhbmRpZGF0ZTpzdHJpbmcpOmJvb2xlYW4gPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRmxhZ3MuaW5jbHVkZXMoZmxhZ0NhbmRpZGF0ZSBhcyBGbGFnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgYXMgQXJyYXk8RmxhZz5cbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZ2l2ZW5Vbmtub3duOkFycmF5PHN0cmluZz4gPVxuICAgICAgICAgICAgICAgICAgICAoW10gYXMgQXJyYXk8c3RyaW5nPikuY29uY2F0KHF1ZXJ5UGFyYW1ldGVyLnVua25vd24gfHwgW10pXG4gICAgICAgICAgICAgICAgY29uc3QgdW5rbm93bjpVbmtub3duVGVjaG5vbG9neUNvbmZpZ3VyYXRpb24gPVxuICAgICAgICAgICAgICAgICAgICBnaXZlblVua25vd24ubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIFVua25vd25UZWNobm9sb2d5Q29uZmlndXJhdGlvbnMuaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBnaXZlblVua25vd25bMF0gYXMgVW5rbm93blRlY2hub2xvZ3lDb25maWd1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgICkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2l2ZW5Vbmtub3duWzBdIGFzIFVua25vd25UZWNobm9sb2d5Q29uZmlndXJhdGlvbiA6XG4gICAgICAgICAgICAgICAgICAgICAgICAncG9seWZpbGwnXG4gICAgICAgICAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgICAgICAgICAgLy8gcmVnaW9uIGJ1aWxkIGZlYXR1cmUgb3B0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IGZlYXR1cmVPcHRpb25zOk1hcHBpbmc8e2ZsYWdzOkFycmF5PEZsYWc+fT4gPSB7fVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZmVhdHVyZSBvZiBmZWF0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uOltzdHJpbmcsIC4uLkFycmF5PEZsYWc+XSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLnNwbGl0KCd8JykgYXMgW3N0cmluZywgLi4uQXJyYXk8RmxhZz5dXG5cbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZU9wdGlvbnNbY29uZmlndXJhdGlvblswXV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFnczogY29uZmlndXJhdGlvbi5sZW5ndGggPiAxID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uWzFdIGFzIHVua25vd24gYXMgQXJyYXk8RmxhZz4gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgICAgICAgICAgLy8gcmVnaW9uIGJ1aWxkIGNvbmZpZ3VyYXRpb24gYW5kIGxvZ1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVzLFxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlczogZmVhdHVyZU9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIG1pbmlmeTogcmVxdWVzdC51cmwuaW5jbHVkZXMoJy5taW4uanM/JyksXG4gICAgICAgICAgICAgICAgICAgIHVhU3RyaW5nOiByZXF1ZXN0LmhlYWRlcnNbJ3VzZXItYWdlbnQnXSxcbiAgICAgICAgICAgICAgICAgICAgdW5rbm93blxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcbiAgICAgICAgICAgICAgICAgICAgJ0FwcGx5IHBvbHlmaWxsIGNvbmZpZ3VyYXRpb246IFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGAke1Rvb2xzLnJlcHJlc2VudChjb25maWd1cmF0aW9uKX1cImBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgICAgICAgICAgLy8gcmVnaW9uIHdyaXRlIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDIwMFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNldEhlYWRlcihcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2phdmFzY3JpcHQ7IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLndyaXRlKFxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwb2x5ZmlsbExpYnJhcnkuZ2V0UG9seWZpbGxTdHJpbmcoY29uZmlndXJhdGlvbikgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3Igb2NjdXJyZWQ6JywgZXJyb3IpXG4gICAgICAgICAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gNTAwXG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICByZXNwb25zZS5lbmQoKVxuICAgICAgICB9XG4gICAgfVxuKVxuXG5jb25zdCBwb3J0Om51bWJlciA9XG4gICAgcGFyc2VJbnQocHJvY2Vzcy5hcmd2WzJdID8/IHByb2Nlc3MuZW52LlBPTFlGSUxMX1BPUlQgPz8gODA4MClcblxuY29uc29sZS5pbmZvKGBMaXN0ZW4gb24gcG9ydCAke3BvcnR9IGZvciBpbmNvbWluZyByZXF1ZXN0cy5gKVxuXG5pbnN0YW5jZS5saXN0ZW4ocG9ydClcblxuZm9yIChjb25zdCBuYW1lIG9mIENsb3NlRXZlbnROYW1lcylcbiAgICBwcm9jZXNzLm9uKG5hbWUsICgpOnZvaWQgPT4ge1xuICAgICAgICBjb25zb2xlLmluZm8oYFxcbkdvdCBcIiR7bmFtZX1cIiBzaWduYWw6IHN0b3BwaW5nIHNlcnZlci5gKVxuXG4gICAgICAgIGluc3RhbmNlLmNsb3NlKCgpOnZvaWQgPT4gY29uc29sZS5pbmZvKCdTZXJ2ZXIgc3RvcHBlZC4nKSlcbiAgICB9KVxuLy8gcmVnaW9uIHZpbSBtb2RsaW5lXG4vLyB2aW06IHNldCB0YWJzdG9wPTQgc2hpZnR3aWR0aD00IGV4cGFuZHRhYjpcbi8vIHZpbTogZm9sZG1ldGhvZD1tYXJrZXIgZm9sZG1hcmtlcj1yZWdpb24sZW5kcmVnaW9uOlxuLy8gZW5kcmVnaW9uXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQjtBQUNBO0FBQ0EsSUFBTUEsS0FBSyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBVTtBQUUxQyxJQUFNQywrQkFBK0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQVU7QUFHdkU7QUFDQSxJQUFNQyxRQUFtQixHQUFHLElBQ3hCQyxrQkFBWTtFQUFBLHlGQUVaLGlCQUNJQyxPQUF5QixFQUFFQyxRQUEyQjtJQUFBO0lBQUE7TUFBQTtRQUFBO1VBQUE7WUFBQTtZQUdsREMsT0FBTyxDQUFDQyxJQUFJLENBQUMsaUJBQWlCLEVBQUVILE9BQU8sQ0FBQ0ksR0FBRyxDQUFDO1lBQUEsSUFFdkNKLE9BQU8sQ0FBQ0ksR0FBRyxDQUFDQyxVQUFVLENBQUMsWUFBWSxDQUFDO2NBQUE7Y0FB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