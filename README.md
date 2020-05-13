# html5-routing
Micro library to add HTML5 routing capabilities to any website

## Example
https://optimisme.github.io/html5-routing/.

## Features

It does not use '#', making it compatible with intra navigation sites and plugins

It uses the navigation history from the browser where each route is defined by '/route'

Users can navigate with 'back' and 'forward' buttons

Programmers can use 'a' tags to change to another screen: '&lt;a href="/route"&gt;' 

Or, programmers can change to another screen from javascript with 'routing.changeTo('/list')'

## How to use it

Add this library with:
&lt;script src='/routing.js'&gt;&lt;/script&gt;

This script will add one custom element named 'route-screen' that you can use like:
&lt;route-screen id='home'&gt;Home screen contents&lt;/route-screen&gt;

Each 'route-screen' element contains the html source of one navigation screen of the application

The library automatically handles the window.history states and sets the 'display' property of each 'route-screen' element to 'none' if the route doesn't match

The id of each 'root-screen' element matches its URL when shown

By default, the '/' route will show the first 'root-screen' defined (use id="home" as the first 'route-screen' is recommended)

Finally, 'route-screen' elements can define two functions:

&lt;route-screen id='home' onshow='console.log(this.args)'&gt;Home screen contents&lt;/route-screen&gt;
'onshow' will be called after that 'route' is shown (its 'style.display' property will be set to its default value)

Programmers can get the parameters of the URL with 'this.args', for example when the next link is clicked:
&lt;a href='/detail/3/A'&gt;Product 3 with config A&lt;/a&gt;

- Navigator will set the URL to '/detail/3/A'
- Section <route-screen id='detail' onshow='loadDetail(this.args)'&gt; will be shown
- loadDetail function will be called with ['3', 'A'] parameters

&lt;route-screen id='home' onshow='console.log(this.args)'&gt;Home screen contents&lt;/route-screen&gt;
'onhide' will be called before that 'route' is hidden (its 'style.display' property will be set to 'none')

These functions can return a 'Promise' and the library will wait until the call is resolved (see the animated example).