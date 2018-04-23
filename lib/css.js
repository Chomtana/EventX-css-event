"use strict";

var _eventxCore = require("eventx-core");

var _eventxCore2 = _interopRequireDefault(_eventxCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.evx) global.evx = _eventxCore2.default;

_eventxCore2.default.createEvent("csschange", function (target, callback) {
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"] };

    var ob = new MutationObserver(function (mutationsList) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var mutation = _step.value;

                if (mutation.target == target) {
                    var curr = mutation.target.style;
                    var old = mutation.oldValue.split(';');
                    var styleName = null;
                    var oldStyleValue = null;
                    if (old[old.length - 1].trim() == "") old.pop();
                    //console.log(old);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = old[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _style = _step2.value;

                            var style = _style.split(':');
                            style[1] = style[1].trim();
                            //console.log(style);
                            if (curr[style[0]] != style[1]) {
                                styleName = style[0];
                                oldStyleValue = style[1];
                                //break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    mutation.styleName = styleName;
                    mutation.oldStyleValue = oldStyleValue;
                    //console.log(styleName);
                    if (styleName) callback(mutation);
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

    ob.observe(target, config);

    return function () {
        //ob.unobserve(target);
        ob.disconnect();
    };
});

_eventxCore2.default.createVarEvent("csschange", function (target, args, callback) {
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"] };

    var ob = new MutationObserver(function (mutationsList) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = mutationsList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var mutation = _step3.value;

                if (mutation.target == target) {
                    var curr = mutation.target.style;
                    var old = mutation.oldValue.split(';');
                    var styleName = null;
                    var oldStyleValue = null;
                    if (old[old.length - 1].trim() == "") old.pop();
                    //console.log(old);
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = old[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var _style = _step4.value;

                            var style = _style.split(':');
                            style[1] = style[1].trim();
                            //console.log(style);
                            if (curr[style[0]] != style[1]) {
                                styleName = style[0];
                                oldStyleValue = style[1];
                                //break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }

                    mutation.styleName = styleName;
                    mutation.oldStyleValue = oldStyleValue;
                    if (styleName && args[0] == styleName) callback(mutation);
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    });

    ob.observe(target, config);

    return function () {
        //ob.unobserve(target);
        ob.disconnect();
    };
});