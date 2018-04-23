import evx from 'eventx-core';

if (!global.evx) global.evx = evx;

evx.createEvent("csschange",function(target,callback) {
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"]};

    const ob = new MutationObserver(mutationsList => {
        for (var mutation of mutationsList) {
            if (mutation.target == target) {
                var curr = mutation.target.style;
                var old = mutation.oldValue.split(';');
                var styleName = null;
                var oldStyleValue = null;
                if (old[old.length-1].trim()=="") old.pop();
                //console.log(old);
                for (var _style of old) {
                    var style = _style.split(':');
                    style[1] = style[1].trim();
                    //console.log(style);
                    if (curr[style[0]]!=style[1]) {
                        styleName = style[0];
                        oldStyleValue = style[1];
                        //break;
                    }
                }
                mutation.styleName = styleName;
                mutation.oldStyleValue = oldStyleValue;
                //console.log(styleName);
                if (styleName) callback(mutation);
            }
        }
    });

    ob.observe(target,config);

    return function() {
        //ob.unobserve(target);
        ob.disconnect();
    }
});

evx.createVarEvent("csschange",function(target,args,callback) {
    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"]};

    const ob = new MutationObserver(mutationsList => {
        for (var mutation of mutationsList) {
            if (mutation.target == target) {
                var curr = mutation.target.style;
                var old = mutation.oldValue.split(';');
                var styleName = null;
                var oldStyleValue = null;
                if (old[old.length-1].trim()=="") old.pop();
                //console.log(old);
                for (var _style of old) {
                    var style = _style.split(':');
                    style[1] = style[1].trim();
                    //console.log(style);
                    if (curr[style[0]]!=style[1]) {
                        styleName = style[0];
                        oldStyleValue = style[1];
                        //break;
                    }
                }
                mutation.styleName = styleName;
                mutation.oldStyleValue = oldStyleValue;
                if (styleName && args[0]==styleName) callback(mutation);
            }
        }
    });

    ob.observe(target,config);

    return function() {
        //ob.unobserve(target);
        ob.disconnect();
    }
});