# html5-routing
Micro library to add HTML5 routing capabilities to any website

## Example
https://optimisme.github.io/html5-routing/.

## Features

It does not use '#', making it compatible with intra navigation sites and plugins

It uses the navigation history from the browser where each route is defined by '/sectionroute'

Users can navigate with 'back' and 'forward' buttons

Programmers can use 'a' tags to change to another screen: '<a href="/sectionroute">' 

Or, programmers can change to another screen from javascript with 'routing.changeTo('/list')'

## How to use it

Add this library with:
<script src='/routing.js'></script>

This script will add one custom element named 'route-screen' that you can use like:
<route-screen id='home'>Home screen contents</route-screen>

Each 'route-screen' element contains the html source of one navigation screen of the application

The library automatically handles the window.history states and sets the 'display' property of each 'route-screen' element to 'none' if the route doesn't match

The id of each 'root-screen' element matches its URL when shown

By default, the '/' route will show the first 'root-screen' defined (use id="home" as the first 'route-screen' is recommended)

Finally, 'route-screen' elements can define two functions:

<route-screen id='home' onshow='console.log(this.args)'>Home screen contents</route-screen>
'onshow' will be called after that 'route' is shown (its 'style.display' property will be set to its default value)

Programmers can get the parameters of the URL with 'this.args', for example when the next link is clicked:
<a href='/detail/3/A'>Product 3 with config A</a>

- Navigator will set the URL to '/detail/3/A'
- Section <route-screen id='detail' onshow='loadDetail(this.args)'> will be shown
- loadDetail function will be called with ['3', 'A'] parameters

<route-screen id='home' onshow='console.log(this.args)'>Home screen contents</route-screen>
'onhide' will be called before that 'route' is hidden (its 'style.display' property will be set to 'none')

These functions can return a 'Promise' and the library will wait until the call is resolved (see the animated example).