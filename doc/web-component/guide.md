
Web component guide
===============================

Get started
--------------------------------
Follow [this tutorial](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) To create your first custom element. Let me know if you had any problem.

1. This tutorial creates the custom element on shadow DOM. Can you modify it to make it on the "light DOM"? (do not modify the files here, just do it on your own computer for practice ... BTW what is the light DOM?) Bear in mind that we always make custom elements in the shadow DOM.

2. In the folder `samples` you'll find two js files which implement custom element. Try them out in some html file, please note:
- The files are *module* not ordinary js files. So you won't be able to include them directly in the browser using `<script>` tag. For modules, you will need tools such as *webpack* or *browserify*. But for now no need to bother with them. Just remove the expression `module.exports = ` from the beginning, and then you will have a regular javascript class that can be included in your html directly.
- The custom elements here are rendered into the light DOM. In fact later on in our tasks we will modify them so that they render into the shadow DOM. But to keep things simple for now, they render into the light DOM. That means you can apply css style to them (and their children) just like normal any other html element. Make sure you include the *bundle.css* (from the css folder of the project) in order to apply the right style to these elements (the styles for these elements are defined in `/styles/_base-inputs.scss`)

Make sure you:
- Can use these element in an html
- Understand the js file
- Understand how they are styled using css (bundle.css)

Let me know if you have any problem before doing the next learning module. For this project we are going to write some web components.

Next, learn more about the shadow DOM by reading [this guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), in particular learn about how to style a custom element that is inside a shadow DOM. Note that regular css styles will not go inside a shadow DOM. But [custom css styles](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) can go inside. In our projects we use css custom styles for custom elements. So make sure you learn about custom css style and css variables.  

Next, learn about *slots* in [this guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots). Slots are a modern feature and they make it very easy to make more complex items from simple items within the custom element. We definitely use slots a lot in our projects. 