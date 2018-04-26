import evx from 'eventx-core';

if (typeof window !== "undefined" && !window.evx) window.evx = evx;

function kebab(string) {
    return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function cloneComputedStyle(target) {
    var res = {};
    var cs = window.getComputedStyle(target);
    for(var i in cs) {
        if (!isFinite(i)) {
            res[i] = cs[i];
        }
    }
    return res;
}

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
                mutation.changetype = "inline";
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

evx.createEvent("mediastylechange", function (target, callback) {
    var oldcss = cloneComputedStyle(target);

    //console.log("Attach",oldcss);

    function filterinline() {
        oldcss = cloneComputedStyle(this);
    }

    evx.on(target,"inlinestylechange",filterinline);

    function onfire() {
        //setTimeout(function() {
            //console.log("onfire");
            var newcss = cloneComputedStyle(target);
            for (var i in newcss) {
                if (!isFinite(i)) {
                    /*if (i=="width") {
                        console.log(oldcss[i],newcss[i]);
                    }*/
                    if (i!="cssText" && oldcss[i] != newcss[i]) {
                        callback({
                            target:target,
                            styleName:kebab(i),
                            oldStyleValue:oldcss[i],
                            newStyleValue:newcss[i],
                            changetype: "media"
                        });
                    }
                }
            }
            oldcss = newcss;
        //},1);
    }
    window.addEventListener('resize', onfire);

    return function() { window.removeEventListener('resize', onfire); oldcss = null; }
});

evx.createVarEvent("mediastylechange", function (target, args, callback) {
    var _callback = function(e) {
        if (e.styleName == args[0]) callback(e);
    }
    evx.on(target,"mediastylechange",_callback);

    return function () {
        //ob.unobserve(target);
        evx.off(target,"mediastylechange",_callback);
    }
});

evx.createEvent("stylechange", function (target, callback) {
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

    evx.on(target,"inlinestylechange",callbackinline);
    evx.on(target,"mediastylechange",callbackmedia);
    return function() { 
        evx.off(target,"inlinestylechange",callbackinline);
        evx.off(target,"mediastylechange",callbackmedia);
    }
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

export default evx;