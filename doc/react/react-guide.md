
Writing react components guide
======================================
In some of the task you need to use react, particularly you'll need to create some react components. Here are the standards and conventions we follow in our project.

Use preact
-----------------
For now we use [preact](https://preactjs.com/) which is the same as reactjs, but is smaller and faster. You can still follow the official react [guide](https://reactjs.org/docs/getting-started.html) though.

Uee template lit instead of jsx
------------------------------------
It is common to use JSX with react, but modern javascript offers [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), and now it is possible use native js template instead of jsx. To do so you'll need to use the [htm tool](https://github.com/developit/htm)(in this link there are examplses provided). 

The bottomline is you can use react directly in the browser `<script>` without having to use webpack and babel to compile your jsx. That being said, we still use webpack/babel in our project order to use javascript ES6 syntax. But for your design tasks the browser should be enough. Just use a modern browser and hopefully it supports all the js features we need. In the future we may need to use webpack for more advanced tasks.

For a sample in-browser basic react component example see `p1.html` in the samples folder.

Web component: Connecting react to the outside html world
------------------------------------------------------------
In some tasks you need to write a web component using react. Sample file `p2.html` shows a sample counter component that emits `onchange` event when you press the button three times, and its value is equal to the counter. 

As you can see in the example `p2.html`, our general approach to make a web component is: 

1. mount the react component on a `<span>` host html element
2. pass the host element as the prop `host` to the react component.
3. Use the `props.host` within the react component to manupulate the host element, e.g., emi events or set its value, etc. 

Note: this is NOT the standard web component as defiend in [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components). But for practical purposes it is pretty enough for us. Please bear in mind that the term "web component" is a general term used for a veriaty of approaches which are not necessarily in line with the official web component as defined in MDN. For example the reactjs [guide](https://reactjs.org/docs/web-components.html) proposes an alternative approach to create web component.   


Slots
--------------------
In some react tasks we need to reposition the children of a react component and rrange them in a different way. This is a well-known technique which is also known as `slots`.  
