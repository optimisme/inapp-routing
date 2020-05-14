# html5-routing
Micro library to add HTML5 routing capabilities to any website

## Example
https://optimisme.github.io/html5-routing/.

## Features

It uses the navigation history from the browser where each route is defined by a path (for example: '/home', '/html5-route/examples/3')

Users can navigate with 'back' and 'forward' buttons

Programmers can use 'a' tags to change to another screen or route: 

`'<a href="/home">'`
`'<a href="/html5-route/examples/3">'`

Or, programmers can change to another screen from javascript with 'routing.changeTo("/home")'

## How to use it

Add this library with:

`<script src='/routing.js'></script>`

This script will add one custom element named 'x-route' that you can use like:

`<x-route id='home'>Home screen contents</x-route>`

Each 'x-route' element contains the html source of one navigation screen of the application

The id of each 'root-screen' element matches its URL when shown (for example id='home' is the route '/home')

The library automatically handles the window.history states and sets the 'display' property of each 'x-route' element to 'none' if the route doesn't match

By default, the '/' route will show the first 'root-screen' defined (use id="home" as the first 'x-route' is recommended)

If the routes are relative to a base, define the 'routing.base' like in the example (where it is used to make it compatible with github pages and sets all routes after '/html5-routing')

**NOTE**: Do not set 'display: none' for 'x-route' as a default value, or the library will hang

Finally, 'x-route' elements can define two functions:

`<x-route id='home' onshow='console.log(this.args)'>Home screen contents</x-route>`

**'onshow'** will be called after that 'route' is shown (its 'style.display' property will be set to its default value and then the function is called)

Programmers can get the parameters of the URL with 'this.args', for example when the next link is clicked:

`<a href='/detail/3/A'>Product 3 with config A</a>`

- Navigator will set the URL to '/detail/3/A'
- Section `<x-route id='detail' onshow='loadDetail(this.args)'>` will be shown
- loadDetail function will be called with ['3', 'A'] parameters

`<x-route id='home' onshow='console.log(this.args)'>Home screen contents</x-route>`

**'onhide'** will be called before that 'route' is hidden (the function is called, and then its 'style.display' property will be set to 'none')

If the return value of these functions is a 'Promise', the library will wait until the call is resolved (see the animated example).