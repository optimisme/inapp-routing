# html5-routing

Micro library that sets in-app navigation for single page apps, showing or hiding `<x-route>` elements depending on the browser URLs.

## Example
https://optimisme.github.io/html5-routing.

## Features

It is arround 100 lines of code that anyone can hack and adapt to its needs

It uses the navigation history stack from the browser, where each route is defined by a path

Users can navigate with 'back' and 'forward' buttons

Users can use 'a' tags to show the corresponding `<x-route>` element: 

`'<a href="/home">'`

`'<a href="/html5-route/examples/3">'`

Also from javascript with 'routing.changeTo("/home")'

## How to use it

Add this library with:

`<script src='/routing.js'></script>`

Use the custom element named `<x-route>`:

`<x-route path='/home'>Home screen contents</x-route>`

## Benefits

It is an "HTMLUnknownElement" without any custom definition

Each `<x-route>` element contains the html source of one navigation screen of the application

The path of each `<x-route>` element matches its URL when shown (for example path='/home' is the route '/home')

The library automatically handles the window.history states and sets the 'display' property of each `<x-route>` element to 'none' if the route doesn't match

By default, the '/' route will show the first `<x-route>` defined

## Attributes 'onshow' and 'onhide'

Finally, `<x-route>` elements can define two attributes:

**'onshow'** source will be called after that `<x-route>` element is shown 
(its 'style.display' property will be set to its default value and then the function is called)

`<x-route path='home' onshow='console.log("Show home")'>Home screen contents</x-route>`

**'onhide'** source will be called before that `<x-route>` element is hided (the function is called, and then its 'style.display' property will be set to 'none')

`<x-route path='home' onhide='console.log("Hide home")'>Home screen contents</x-route>`

If the return value of these functions is a 'Promise', the library will wait until the call is resolved (see the animated example).

---

**NOTE**: Do not set 'display: none' for `<x-route>` elements as a default value, or the library will hang
