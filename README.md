# html5-routing
Micro library to add HTML5 routing capabilities to any website

This library shows or hides <x-route> contents with browser's history depending on the URLs route

## Example
https://optimisme.github.io/html5-routing.

## Features

It is arround 100 lines of code that anyone can hack and adapt to its needs

It uses the navigation history from the browser where each route is defined by a path (for example: '/home', '/html5-route/examples/3')

Users can navigate with 'back' and 'forward' buttons

Programmers can use 'a' tags to change to another screen or route: 

`'<a href="/home">'`

`'<a href="/html5-route/examples/3">'`

Or, programmers can change to another screen from javascript with 'routing.changeTo("/home")'

## How to use it

Add this library with:

`<script src='/routing.js'></script>`

This script will use the custom element named 'x-route' that you can use like:

`<x-route path='home'>Home screen contents</x-route>`

It is an "HTMLUnknownElement" without any custom definition

Each 'x-route' element contains the html source of one navigation screen of the application

The path of each 'x-route' element matches its URL when shown (for example path='/home' is the route '/home')

The library automatically handles the window.history states and sets the 'display' property of each 'x-route' element to 'none' if the route doesn't match

By default, the '/' route will show the first 'x-route' defined

## Attributes 'onshow' and 'onhide'

**NOTE**: Do not set 'display: none' for 'x-route' elements as a default value, or the library will hang

Finally, 'x-route' elements can define two attributes with code:

`<x-route path='home' onshow='console.log("Show home")'>Home screen contents</x-route>`

**'onshow'** source will be called after that 'route' is shown (its 'style.display' property will be set to its default value and then the function is called)

`<x-route path='home' onhide='console.log("Hide home")'>Home screen contents</x-route>`

**'onhide'** source will be called before that 'route' is hidden (the function is called, and then its 'style.display' property will be set to 'none')

If the return value of these functions is a 'Promise', the library will wait until the call is resolved (see the animated example).