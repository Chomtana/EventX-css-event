# EventX-css-event
* Allow programmer to listen for css style change event.
* JQuery css style event.
  
# Table of content
* [Installation](#install)
* [Events](#events)
* [Why we need this ???](#why-we-need-this-library-)
* [Examples](#examples)
  * [stylechange event](https://jsfiddle.net/Chomtana/f9wbnjye/)
  * [stylechange:<...> event](https://jsfiddle.net/Chomtana/hezvk3LL/)
  * [inlinestylechange event](https://jsfiddle.net/Chomtana/gt6mmpdj/)
  * [inlinestylechange:<...> event](https://jsfiddle.net/Chomtana/3m3frtc4/)
* [Features](#features)
  * [On](#on)
  * [Off](#off)
  * [Rename Event (Solve event name conflict)](#rename-event-solve-event-name-conflict)

## Install
### Browser
```html
<script src="https://cdn.rawgit.com/Chomtana/EventX-css-event/f96312db/dist/eventx-css.js"></script>
```

### NPM
```
npm install eventx-css-event
```

## Events
| Name | Description | Example |
| ------------- | ------------- | ------------- |
| `stylechange` | Listen to inline and media screen style change | [Click](https://jsfiddle.net/Chomtana/f9wbnjye/) |
| `stylechange:<...>`  | Listen to inline and media screen style change (Only style <...>) | [Click](https://jsfiddle.net/Chomtana/hezvk3LL/) |
| `inlinestylechange`  | Listen to inline style change | [Click](https://jsfiddle.net/Chomtana/gt6mmpdj/) |
| `inlinestylechange:<...>`  | Listen to inline style change (Only style <...>) | [Click](https://jsfiddle.net/Chomtana/3m3frtc4/) |
| `mediastylechange`  | Listen to media style change | |
| `mediastylechange:<...>`  | Listen to media style change (Only style <...>) | |

## Why we need this library ???
### Problem statement
I want to **alert "Style ... changed from ... to ..."** when some css style of #ex is changed, **alert "Style ... added with value ..."** when some css style of #ex is added and **alert "Style ... removed with old value ..."** when some css style of #ex is removed (only consider inline style).

### Before using this library
```javascript
const target = $("#ex");

const ob = new MutationObserver(mutationsList => {
  for (var mutation of mutationsList) {
    if (mutation.target == target[0]) {
      var curr = mutation.target.style;
      var currattr = mutation.target.getAttribute("style").replace(/\/\*(.|\n)*?\*\//g, "").split(';');
      var old = mutation.oldValue ? mutation.oldValue.replace(/\/\*(.|\n)*?\*\//g, "").split(';') : [];
      var styleName = null;
      var oldStyleValue = null;
      var newStyleValue = null;
      if (old.length > 0 && old[old.length - 1].trim() == "") old.pop();
      if (currattr.length > 0 && currattr[currattr.length - 1].trim() == "") currattr.pop();

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
```
```javascript
      if (styleName) {
        if (oldStyleValue && newStyleValue) alert("Style "+styleName+" changed from "+oldStyleValue+" to "+newStyleValue);
        else if (!oldStyleValue && newStyleValue) alert("Style "+styleName+" added with value "+newStyleValue);
        else if (oldStyleValue && !newStyleValue) alert("Style "+styleName+" removed with old value "+oldStyleValue);
      }
```
```javascript
    }
  }
});

var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"]};
ob.observe(target[0],config);
```
**Note:** Above example require JQuery

[View and play in JSFiddle](https://jsfiddle.net/Chomtana/30d2wctj/)

### After using this library
```javascript
$("#ex").on("inlinestylechange",function(e) {
```
```javascript
  if (e.oldStyleValue && e.newStyleValue) alert("Style "+e.styleName+" changed from "+e.oldStyleValue+" to "+e.newStyleValue);
  else if (!e.oldStyleValue && e.newStyleValue) alert("Style "+e.styleName+" added with value "+e.newStyleValue);
  else if (e.oldStyleValue && !e.newStyleValue) alert("Style "+e.styleName+" removed with old value "+e.oldStyleValue);
```
```javascript
});
```
**Note:** Above example require JQuery

[View and play in JSFiddle](https://jsfiddle.net/Chomtana/gt6mmpdj/)

### Difference
* First and final block obviously shorter.
* Closer to english language.
* Remember easier.

### Without JQuery
```javascript
evx.on(document.getElementById("ex"),"inlinestylechange",function(e) {
```
```javascript
  if (e.oldStyleValue && e.newStyleValue) alert("Style "+e.styleName+" changed from "+e.oldStyleValue+" to "+e.newStyleValue);
  else if (!e.oldStyleValue && e.newStyleValue) alert("Style "+e.styleName+" added with value "+e.newStyleValue);
  else if (e.oldStyleValue && !e.newStyleValue) alert("Style "+e.styleName+" removed with old value "+e.oldStyleValue);
```
```javascript
});
```
Yeah, still simple and easy.

## Examples
* [stylechange event](https://jsfiddle.net/Chomtana/f9wbnjye/)
* [stylechange:<...> event](https://jsfiddle.net/Chomtana/hezvk3LL/)
* [inlinestylechange event](https://jsfiddle.net/Chomtana/gt6mmpdj/)
* [inlinestylechange:<...> event](https://jsfiddle.net/Chomtana/3m3frtc4/)

## Features
**[You can find list of event name here](#events)**
### On
```javascript
$("#ex").on("<event name>",function(e) { console.log(e,this); ... });
```
```javascript
evx.on(<target HTMLElement>,"<event name>",function(e) { console.log(e,this); ... });
```
* View all JQuery coding style at http://api.jquery.com/on/
* e is a ResizeObserverEntry object
* this = target element **(Warning: not working if you use arrow function)**
* For more information about **ResizeObserverEntry** run console.log(e) in event handler or read [document](https://wicg.github.io/ResizeObserver/#resize-observer-entry-interface)

### Off
```javascript
$("#ex").off("<event name>");
```
```javascript
evx.off(<target HTMLElement>,"<event name>",[handler (Optional)])
```
* View all JQuery coding style at http://api.jquery.com/off/

### Rename Event (Solve event name conflict)
```javascript
evx.renameEvent("<event name>","<newname>")
```

### Create new event type
[Read at EventX-core](https://github.com/Chomtana/EventX-core#create-new-event)

### Remove event type
[Read at EventX-core](https://github.com/Chomtana/EventX-core)
