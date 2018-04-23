# EventX-css-event
* Allow programmer to listen for css style change event.
* JQuery css style event.
* More accuracy if JQuery is included (Ex: if you change border-color from black to #000000 it will not fire stylechange event if you include JQuery otherwise it will fire)
  
# Table of content
* [Installation](#install)
* [Why we need this ???](#why-we-need-this-)
* [Examples](#examples)
  * [For Getting started](https://jsfiddle.net/Chomtana/zyjy6xsk/)
  * [High detail (Show both **on** and **off**)](https://jsfiddle.net/Chomtana/o3roqcc0/)
* [Features](#features)
  * [On](#on)
  * [Off](#off)
  * [Rename Event (Solve event name conflict)](#rename-event-solve-event-name-conflict)

## Install
### Browser
```html
<script src="..."></script>
```

### NPM
```
npm install eventx-css-event
```

## Why we need this ???
### Problem statement
I want to alert "Style ... changed from ... to ..." when some css style of #ex is changed.

### Before using this
```javascript
const target = $("#ex");

const ob = new MutationObserver(mutationsList => {
  for (var mutation of mutationsList) {
    if (mutation.target == target) {
      var curr = mutation.target.style;
      var old = mutation.oldValue.split(';');
      var styleName = null;
      var oldStyleValue = null;
      var newStyleValue = null;
      if (old[old.length - 1].trim() == "") old.pop();
      for (var _style of old) {
        var style = _style.split(':');
        style[1] = style[1].trim();
        if (curr[style[0]] != style[1]) {
          styleName = style[0];
          oldStyleValue = style[1];
          newStyleValue = style[0];
          break;
        }
      }
```
```javascript
      if (styleName) alert("Style "+styleName+" changed from "+oldStyleValue+" to "+newStyleValue);
```
```javascript
    }
  }
});

ob.observe(target[0]);
```
**Note:** Above example require JQuery

[View and play in JSFiddle](https://jsfiddle.net/Chomtana/fLe166sL/)

### After using this
```javascript
$("#ex").on("csschange",function(e) {
```
```javascript
  alert("Style "+e.styleName+" changed from "+e.oldStyleValue+" to "+e.newStyleValue);
```
```javascript
});
```
**Note:** Above example require JQuery

[View and play in JSFiddle](https://jsfiddle.net/Chomtana/zyjy6xsk/)

### Difference
* First and final block obviously shorter.
* Closer to english language.
* Remember easier.

### Without JQuery
```javascript
evx.on(document.getElementById("ex"),"resize",function(e) {
```
```javascript
  if ($(this).width() < 50 || $(this).height() < 50) alert("Too small");
```
```javascript
});
```
Yeah, still simple and easy.

**More detail about this library in this [example](https://jsfiddle.net/Chomtana/o3roqcc0/)**

## Examples
* [For Getting started](https://jsfiddle.net/Chomtana/zyjy6xsk/)
* [High detail (Show both **on** and **off**)](https://jsfiddle.net/Chomtana/o3roqcc0/)

## Features
### On
```javascript
$("#ex").on("resize",function(e) { console.log(e,this); ... });
```
```javascript
evx.on(<target HTMLElement>,"resize",function(e) { console.log(e,this); ... });
```
* View all JQuery coding style at http://api.jquery.com/on/
* e is a ResizeObserverEntry object
* this = target element **(Warning: not working if you use arrow function)**
* For more information about **ResizeObserverEntry** run console.log(e) in event handler or read [document](https://wicg.github.io/ResizeObserver/#resize-observer-entry-interface)

### Off
```javascript
$("#ex").off("resize");
```
```javascript
evx.off(<target HTMLElement>,"resize",[handler (Optional)])
```
* View all JQuery coding style at http://api.jquery.com/off/

### Rename Event (Solve event name conflict)
```javascript
evx.renameEvent("resize","<newname>")
```

### Create new event type
[Read at EventX-core](https://github.com/Chomtana/EventX-core#create-new-event)

### Remove event type
[Read at EventX-core](https://github.com/Chomtana/EventX-core)
