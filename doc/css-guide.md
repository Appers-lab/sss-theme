
Web standards
----------------------------------
We adhere to HTML5 standards, patocularly its semantic usage of elements. So instead of using ```<div>``` for everything we use the more semantically meaninful tags such as ```<article>```, ```<section>```, ```<header>```, ```<menu>```, etc. For a full list of html5 tags and their definition/usage see [chapter 4](https://html.spec.whatwg.org/multipage/#toc-semantics) of web standards. Here are some of these rules:

- Use ```<header>``` for all header sections (top header, main header and secondary header)

  
- Use ```<main>``` for the main body of the page, excluding headers, footers and side menus

  
- Use ```<nav>``` as the main container for page navigation menus, such as the meaus in the headers or sidebars (but not non-navigational menus like tab menus). This element usually contains a ```<menu>``` element

  
- Use ```<menu>``` as the container for menu and ```<li>``` for its items. Each ```<li>``` could contain ```<a>``` or ```<button>```
 

- Use ```<article>``` for any standalone component (could be nested)
  

- Use ```<section>``` for any section of the page or a component which is not standalone (could be nested)
  

- Use ```<p>``` for any normal text. For variations of text use tags such as ```<u>```, ```<strong>```, etc.
  

- Use ```<div>``` ONLY for creating layout (e.g., grids, columns, etc)
  

- etc.

> Following these rules results in a more professional website with better SEO and accessibility scores.


CSS frameworks introduction
----------------------------------
Currently there are several well-known CSS architecture/model out there, all aiming at making it easy to write css for a *"big project"* as they claim. Here are links to three most famous ones:

- [BEM](http://getbem.com/)
- [OOCSS](https://github.com/stubbornella/oocss/wiki)
- [SMACSS](http://smacss.com/book/)

For a general comparison take a look [here](https://snipcart.com/blog/organize-css-modular-architecture)

In short, each of these architectures are basically a bunch of rules telling us how we should name the css classes in order to make it easy to udnerstand the role of each class and avoid name collision. For example, consider the following html:

```html
<ul>
    <li> some stuff 1 </li>
    <li> some stuff 2 </li>
    <li> some stuff 3 </li>
</ul>
```

Now in BEM framework, if you call the class for the main list (```<ul>```) *mylist*, then the class for each item should have the format like *mylist__item*.

```html
<ul class="mylist">
    <li class="mylist__item"> some stuff 1 </li>
    <li class="mylist__item"> some stuff 2 </li>
    <li class="mylist__item"> some stuff 3 </li>
</ul>
```

Here the notation double underscore (__) is used to mean that this element is the *"item"* (class) OF the *mylist* (class) ...

Our framework
-----------------------------
In our projects we mainly use BEM as the base architecture, though we will add some specific rules to that as well. For a quick overview of BEM refer to [this](https://css-tricks.com/building-a-scalable-css-architecture-with-bem-and-utility-classes/). The language we use is SCSS, and the files can be found in the *-sass* folder of the frontend project you cloned.  

Also inspired by SMACSS we divide our css into three files (or layers):
- **Layer 0:** layouts.scss: universal classes to build basic layouts. The main goal of these classes is to allow you to "place" elements in the right place (such as arranging elements as a horizontal menu) This file is 100% un-opinionated, and is to be used in each project and each device (dekstop/tablet/mobile) WITHOUT any modification.
  

- **Layer 1:** styles.css: This are the opinionated styles (i.e., colors, font-sizes, etc) for the common components used in every project, like menues, dropdowns, etc. The theme and its variables are defined in this file. This layer either extends the class in layer 0 or creates new classes. These new classes should start with s- to specify they are opinionated *Style classes* (e.g., s-btn is the style class for a button). This file is to be used in all projects WITH modifications (to reflext the theme)
  

- **Layer 2:** project.scss: the project specific styles. These are components that are only used in the current project. Example: property search card in a real-estate project. These class names start with double s: ss- (meaning *Specific Style*) This file is NOT to be used in other projects.

Below are more introduction to these three layers with examples.


Layer 0: barebone layout
------------------------------
These classes are defined in layouts.scss and their names do not start with s- or ss-. At the moment these classes are mostly taken from the layour/grid classes of Bootstrap 5.0 source code, which is to be found in the folder boostrap5. You may notice that certain css files of bootstrap5 folder are included in the layouts.scss such as grid, container, flex utilities, etc. 

The classes in layer 0 deal solely with positioning and spacing. They allow us to put elements nicely beside each other or create columns, padding, margins, etc. They have nothing to do with color, font-family, etc, they do not change the "appearance" of the html elements in anyway, all elements will have their original browser-native look when using layer 0 classes. Here are the styles that layer 0 is concern about:

- Grid layouts for horizontal positioning (example classes: row, col-3, col-sm-2, d-flex,)
  

- helper classes for margin, padding, spacers (example classes: mb-3, pt-2, m-2, etc)- responsive classes to show/hide stuffs based on breakpoints (example classes: d-md-none, d-sm-block, etc.)
  

- classes for very basic and common structures that browsers do not support natively but needed in any website/app, e.g., menu (defined in bootstrap5/_nav.scss), dropdown, modal, etc.
  

- unifying basic styles of elements cross browsers (-> styles in bootstrap5/_roboot.scss)

> **Note:** We have modified/simplified some of bootstrap5 files that are imported into layouts.scss. So the folder bootstrap5 is in fact a fork of bootstrap5 project and not exactly identical to that. We use bootstrap 5 as starting point for our layer 0 styles and continue to modify this source to scrape its classes that are fit for a layer 0 stylesheet. Note that bootstrap contains a lot of opinionated styles that do not belong to layer 0 and should be done away.

###Indepedance from styles: 
The styles in layer 0 must be totally indepedant from upper layers. For example, your grid (which you made with layer 0 classes) should look nice and aligned no matter what font-size is used for the elements. One of the most useful boostrap5 clases (included in layouts.scss) for this purpose is the flexbox (class d-flex), specially when combined with "align-items-center" which allow us to put elements side by side and align them by center no matter what the height of each element is. 

If your style breaks when elements become big or small then it is not independant from the style and must be redesigned. Layer 0 styles must be standalone and style-independent. They are not really styles to change the look and appearance, but more like *extensions of the browser* which enable us to place and position elements more easily (browser only allows us to stack elements on top of each other, no native support for grid, menu, etc.)


Layer 1: opinionated styles
----------------------------------
These are opinionated styles containing font-size, color, background-color, etc. They are defined in styles.scss and the class names beging with "s-". These styles are meant to be "general purpose" and contain "common structures used in many project". Here are the areas that these styles are concern about:

- Defining theme variables ($primary-color, $secondary-color, $body-color, $body-font, etc.)
  

- Applying styles to individual elements (like converting the color of ```<a>``` element to the primary color, defining class s-btn for buttons)
  

- Adding additional styles (color, font-size, etc) to the styles defined in layer 0 (like styling the menu, dropdown, modal, etc.)
  

- Styling the common components used in many websites, such as main header, landing page banner, footer, login forms, alrt boxes

Layer 2: project specific styles
-------------------------------------
They project specific styles. They are defined in project.scss and the class names begin with ss-. They are to define specific components for the project, like the product summary card, search bar (with special controls), etc. These styles are mainly "blocks" (in the BEM model). Each such block should be defined i na separate scss file in the "components" folder and then imported into projec.scss  


bundle.css
-------------------
This file imports all three layers into one css file. Thus its soure code is:

```scss
@import "_layouts.scss";
@import "_styles.scss";
@import "_project.scss";
```

This is the file that we will include in our html files.

Design guidelines
------------------------
- When designing a component, first design its layout with layer 0 classes only and make sure everything is placed and aligned correctly. And then add layer 1 & 2 for further styling


- Minimize using layer 2 styles. Try to build thing by later 0 and 1 as much as possible. Use layer 2 only if the component is very special.


- The theme is defined in styles.scss variables. Do not defined theme variables in layer 2 (project.scss)


- Keep style.scss styles to "common" elements (menues, headers, footers, general forms, etc) Do not define project specific components there (like payment form, checkout list, etc.)


Example
---------------------------
Suppose you are tasked to make a page title bar like the following picture:

![alt text](./pic1.png "Logo Title Text 1")

**Step 1:** Making the base layout using layer 0 classes. Note that the component can be divided into two parts: 1- the left section (title section) and the right section (menu section). So the base html along with layer 0 layouting would be:

```html

<!-- making a flexbox to arrange the two section of title and menu horizontally with their vertical position aligned in the center. We use the famous boostrap combination of  "d-flex align-items-center" --> 
<header class="d-flex align-items-center">
    
    <!-- The title section -->
    <section>
        <span>List of Condos</span>
        <a href="/guides/what-is-condo">(What is Condo?)</a>        
    </section>
    
    <!-- menu section - To push this section to right we set the left margin to "auto" using the bootstrap5 class "ms-auto". Please note using <nav> tag since this menu is part of page navigation as stated in the first section of this guide (web standards) -->
    <nav class="ms-auto">
        <menu>
            <li><a class="active">Condo</a></li>
            <li><a>Townhouse</a></li>
            <li><a>House</a></li>
            <li><a>Land</a></li>
        </menu>
    </nav>
    
</header>
```

In this particular example, the layer 0 classes used above are almost enough. The styles in layer 1 will do the rest for us, in particular the ```<menu>``` item has styles defined in layer 1 which makes it like the picture. So all we needed to do for this component could be done with layer 0 and the rest are default styles defined in layer 1. 

But now suppose we want to further customize this component to:
- have light blue color as background
- Have shadow text for the title text ("List of Condos")

**Step 2:** Since these styles are very specific to this particular component, we will need to define them in layer 2 (project specific). So we define a layer 2 class called *ss-page-bar*, and using BEM model, we also include an elemental class *ss-page-bar__title* to add shadow to the title text:

```html
<header class="d-flex align-items-center ss-page-bar">
    
    <!-- The title section -->
    <section>
        <span class="ss-page-bar__title">List of Condos</span>
        <a href="/guides/what-is-condo">(What is Condo?)</a>        
    </section>
    
    <!-- menu section -->
    <nav class="ms-auto">
        <menu>
            <li><a class="active">Condo</a></li>
            <li><a>Townhouse</a></li>
            <li><a>House</a></li>
            <li><a>Land</a></li>
        </menu>
    </nav>
    
</header>
```

```scss

// main "block" class
.ss-page-title {
  
  // light blue background for the component
  background-color: $primary-light-bg;
  
  // in scss & is the parent name, so the expression "&__title" is equivalent to the css class expression ".ss-page-bar__title". This class is used to add shadow to the title text
  &__title {
    text-shadow: 2px 2px #ff0000;
  }
}
```





