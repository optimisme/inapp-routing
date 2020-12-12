# inapp-routing

Micro library that sets in-app navigation for single page apps, defines `<x-route>` elements depending on the browser URLs with in-app actions

## Example
https://optimisme.github.io/inapp-routing.

## Features

It is arround 100 lines of code that anyone can hack and adapt to its needs

It uses the navigation history stack from the browser, where each route is defined by a path

Users can navigate with 'back' and 'forward' buttons

Users can use 'a' tags to show the corresponding `<x-route>` element: 

`'<a href="/home">'`

`'<a href="/examples/list">'`

Also from javascript with 'routing.changeTo("/home")'

If the 'path' is not listed at any `<x-route>` element, then the regular navigation is used.

## How to use it

Download and use this library from your own server:

`<script src='routing.js'></script>`

Use the custom element named `<x-route>` for 'in app' routes:

`<x-route path='/home'></x-route>`

## Benefits

It is an "HTMLUnknownElement" without any custom definition

Each `<x-route>` element contains the html source of one navigation screen of the application

The path of each `<x-route>` element matches its URL when shown (for example path='/home' is the route '/home')

The library automatically handles the window.history states and sets the 'display' property of each `<x-route>` element to 'none' if the route doesn't match

By default, the '/' route will call the first `<x-route>` defined

## Attributes 'oncall' and 'onexit'

Finally, `<x-route>` elements can define two attributes:

**'oncall'** source will be called when an `<x-route>` element is requested 

`<x-route path='home' oncall='console.log("Show home")'></x-route>`

**'onexit'** source will be called before that `<x-route>` element is 'replaced' by another route

`<x-route path='home' onexit='console.log("Hide home")'></x-route>`

If the return value of these functions is a 'Promise', the library will wait until the call is resolved.
