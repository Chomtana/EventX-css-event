"use strict";

var _eventxCore = require("eventx-core");

var _eventxCore2 = _interopRequireDefault(_eventxCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!window.evx) window.evx = _eventxCore2.default;

_eventxCore2.default.setting.resizeObserverFirstRun = true;

_eventxCore2.default.createEvent("resize", function (target, callback) {
    var firstrun = true;

    var ro = new ResizeObserver(function (entries) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var entry = _step.value;

                if (entry.target == target) {
                    if (_eventxCore2.default.setting.resizeObserverFirstRun) {
                        callback(entry);
                    } else {
                        if (!firstrun) {
                            callback(entry);
                        }
                    }
                    firstrun = false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });

    ro.observe(target);

    return function () {
        //ro.unobserve(target);
        ro.disconnect();
    };
});