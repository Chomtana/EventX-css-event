import evx from 'eventx-core';

if (!global.evx) global.evx = evx;

evx.createEvent("inlinestylechange", function (target, callback) {
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"] };

    const ob = new MutationObserver(mutationsList => {
        for (var mutation of mutationsList) {
            if (mutation.target == target) {
                var curr = mutation.target.style;
                var currattr = mutation.target.getAttribute("style").replace(/\/\*(.|\n)*?\*\//g,"").split(';');
                var old = mutation.oldValue ? mutation.oldValue.replace(/\/\*(.|\n)*?\*\//g,"").split(';') : [];
                var styleName = null;
                var oldStyleValue = null;
                var newStyleValue = null;
                if (old.length > 0 && old[old.length - 1].trim() == "") old.pop();
                if (currattr.length > 0 && currattr[currattr.length - 1].trim() == "") currattr.pop();
                //console.log(old);

                if (old.length == currattr.length) {
                    // style change
                    for (var _style of old) {
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
                } else if (old.length < currattr.length) {
                    // add
                    var _old = {};
                    for (var _style of old) {
                        var style = _style.split(':');
                        style[0] = style[0].trim();
                        style[1] = style[1].trim();

                        _old[style[0]] = style[1];
                    }

                    for (var _style of currattr) {
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
                } else {
                    // remove
                    var _curr = {};
                    for (var _style of currattr) {
                        var style = _style.split(':');
                        style[0] = style[0].trim();
                        style[1] = style[1].trim();

                        _curr[style[0]] = style[1];
                    }

                    for (var _style of old) {
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
                }


                mutation.styleName = styleName;
                mutation.oldStyleValue = oldStyleValue;
                mutation.newStyleValue = newStyleValue;
                //console.log(styleName);
                if (styleName) callback(mutation);
            }
        }
    });

    ob.observe(target, config);

    return function () {
        //ob.unobserve(target);
        ob.disconnect();
    }
});

evx.createVarEvent("inlinestylechange", function (target, args, callback) {
    var _callback = function(e) {
        if (e.styleName == args[0]) callback(e);
    }
    evx.on(target,"inlinestylechange",_callback);

    return function () {
        //ob.unobserve(target);
        evx.off(target,"inlinestylechange",_callback);
    }
});

evx.createEvent("stylechange", function (target, callback) {
    evx.on(target,"inlinestylechange",callback);
    return function() { evx.off(target,"inlinestylechange",callback); }
});

evx.createVarEvent("stylechange", function (target, args, callback) {
    var _callback = function(e) {
        if (e.styleName == args[0]) callback(e);
    }
    evx.on(target,"stylechange",_callback);

    return function () {
        //ob.unobserve(target);
        evx.off(target,"stylechange",_callback);
    }
});