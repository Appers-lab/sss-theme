
Web component guide
===============================

Get started
--------------------------------
Follow [this tutorial](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) To create your first Web component. Let me know if you had any problem.

1. This tutorial creates the web component on shadow DOM. Modify it to make it on the "light DOM" (what is the light DOM?)

2. In the folder `wc-samples` (meaning web components samples!) within the project root you'll find two js files which implement web component. Try them out in some html file, please note:
- The files are *module* not ordinary js files. So you won't be able to include them directly in the browser using `<script>` tag. For modules you will need tools such as *webpack* or *browserify*. But for now no need to bother with them. Just remove the expression `module.exports = ` from the beginning and then you will have a regular javascript class that can be included in your html directly.
- Make sure you include the *bundle.css* (from the css folder of the project) in order to see these components correctly. Note that these components have styles defined in `/styles/_base-inputs.scss`

Make sure you:
- Can use these components in an html
- Understand the js file
- Understand how they are styled using css (bundle.css)

Let me know if you have any problem before doing the next learning module. For this project we are going to write some web components.