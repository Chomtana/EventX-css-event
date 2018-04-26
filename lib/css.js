'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _eventxCore = require('eventx-core');

var _eventxCore2 = _interopRequireDefault(_eventxCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== "undefined" && !window.evx) window.evx = _eventxCore2.default;

function kebab(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function cloneComputedStyle(target) {
    var res = {};
    var cs = window.getComputedStyle(target);
    for (var i in cs) {
        if (!isFinite(i)) {
            res[i] = cs[i];
        }
    }
    return res;
}

_eventxCore2.default.createEvent("inlinestylechange", function (target, callback) {
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
                    var currattr = mutation.target.getAttribute("style").replace(/\/\*(.|\n)*?\*\//g, "").split(';');
                    var old = mutation.oldValue ? mutation.oldValue.replace(/\/\*(.|\n)*?\*\//g, "").split(';') : [];
                    var styleName = null;
                    var oldStyleValue = null;
                    var newStyleValue = null;
                    if (old.length > 0 && old[old.length - 1].trim() == "") old.pop();
                    if (currattr.length > 0 && currattr[currattr.length - 1].trim() == "") currattr.pop();
                    //console.log(old);

                    if (old.length == currattr.length) {
                        // style change
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = old[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _style = _step2.value;

                                var style = _style.split(':');
                                style[0] = style[0].trim();
                                style[1] = style[1].trim();
                                if (curr[style[0]] != style[1]) {
                                    styleName = style[0];
                                    oldStyleValue = style[1];
                                    newStyleValue = curr[style[0]];
                                    break;
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
                    } else if (old.length < currattr.length) {
                        // add
                        var _old = {};
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = old[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _style = _step3.value;

                                var style = _style.split(':');
                                style[0] = style[0].trim();
                                style[1] = style[1].trim();

                                _old[style[0]] = style[1];
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

                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = currattr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _style = _step4.value;

                                var style = _style.split(':');
                                style[0] = style[0].trim();
                                style[1] = style[1].trim();
                                if (!_old[style[0]]) {
                                    styleName = style[0];
                                    oldStyleValue = "";
                                    newStyleValue = curr[style[0]];
                                    break;
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
                    } else {
                        // remove
                        var _curr = {};
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = currattr[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var _style = _step5.value;

                                var style = _style.split(':');
                                style[0] = style[0].trim();
                                style[1] = style[1].trim();

                                _curr[style[0]] = style[1];
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = old[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var _style = _step6.value;

                                var style = _style.split(':');
                                style[0] = style[0].trim();
                                style[1] = style[1].trim();
                                if (!_curr[style[0]]) {
                                    styleName = style[0];
                                    oldStyleValue = style[1];
                                    newStyleValue = "";
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }
                    }

                    mutation.styleName = styleName;
                    mutation.oldStyleValue = oldStyleValue;
                    mutation.newStyleValue = newStyleValue;
                    mutation.changetype = "inline";
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

_eventxCore2.default.createVarEvent("inlinestylechange", function (target, args, callback) {
    var _callback = function _callback(e) {
        if (e.styleName == args[0]) callback(e);
    };
    _eventxCore2.default.on(target, "inlinestylechange", _callback);

    return function () {
        //ob.unobserve(target);
        _eventxCore2.default.off(target, "inlinestylechange", _callback);
    };
});

_eventxCore2.default.createEvent("mediastylechange", function (target, callback) {
    var oldcss = cloneComputedStyle(target);

    //console.log("Attach",oldcss);

    function filterinline() {
        oldcss = cloneComputedStyle(this);
    }

    _eventxCore2.default.on(target, "inlinestylechange", filterinline);

    function onfire() {
        //setTimeout(function() {
        //console.log("onfire");
        var newcss = cloneComputedStyle(target);
        for (var i in newcss) {
            if (!isFinite(i)) {
                /*if (i=="width") {
                    console.log(oldcss[i],newcss[i]);
                }*/
                if (i != "cssText" && oldcss[i] != newcss[i]) {
                    callback({
                        target: target,
                        styleName: kebab(i),
                        oldStyleValue: oldcss[i],
                        newStyleValue: newcss[i],
                        changetype: "media"
                    });
                }
            }
        }
        oldcss = newcss;
        //},1);
    }
    window.addEventListener('resize', onfire);

    return function () {
        window.removeEventListener('resize', onfire);oldcss = null;
    };
});

_eventxCore2.default.createVarEvent("mediastylechange", function (target, args, callback) {
    var _callback = function _callback(e) {
        if (e.styleName == args[0]) callback(e);
    };
    _eventxCore2.default.on(target, "mediastylechange", _callback);

    return function () {
        //ob.unobserve(target);
        _eventxCore2.default.off(target, "mediastylechange", _callback);
    };
});

_eventxCore2.default.createEvent("stylechange", function (target, callback) {
    function callbackinline(e) {
        //e.changetype = "inline";
        callback(e);
    }

    function callbackmedia(e) {
        e.attributeName = "style";
        e.attributeNamespace = null;
        e.nextSibling = null;
        e.oldValue = e.oldStyleValue;
        e.previousSibling = null;
        e.removedNodes = [];
        //e.changetype = "media";
        callback(e);
    }

    _eventxCore2.default.on(target, "inlinestylechange", callbackinline);
    _eventxCore2.default.on(target, "mediastylechange", callbackmedia);
    return function () {
        _eventxCore2.default.off(target, "inlinestylechange", callbackinline);
        _eventxCore2.default.off(target, "mediastylechange", callbackmedia);
    };
});

_eventxCore2.default.createVarEvent("stylechange", function (target, args, callback) {
    var _callback = function _callback(e) {
        if (e.styleName == args[0]) callback(e);
    };
    _eventxCore2.default.on(target, "stylechange", _callback);

    return function () {
        //ob.unobserve(target);
        _eventxCore2.default.off(target, "stylechange", _callback);
    };
});

exports.default = _eventxCore2.default;