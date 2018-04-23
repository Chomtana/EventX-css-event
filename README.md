# EventX-css-event
* Allow programmer to listen for css style change event.
* JQuery css style event.
  
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
I want to alert "Background is red" when background-color of #ex is red.

### Before using this
```javascript
const target = $("#ex");

const ro = new ResizeObserver(entries => {
  for(let entry of entries) {
    if (entry.target == target[0]) {
```
```javascript
      if (target.width() < 50 || target.height() < 50) alert("Too small");
```
```javascript
    }
  }
});

ro.observe(target[0]);
```
**Note:** Above example require JQuery

[View and play in JSFiddle](https://jsfiddle.net/Chomtana/fLe166sL/)

### After using this
```javascript
$("#ex").on("resize",function(e) {
```
```javascript
  if ($(this).width() < 50 || $(this).height() < 50) alert("Too small");
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
