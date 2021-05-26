What is the difference between px, em, and rem?
===============================================

### px 
It is an absolute value whose size is fixed regardless of the variable screen size or the units and size of other elements.

### em
It is a unit of measure that is affected by the font size of the parent element.

### rem
It is based on the font size of the root element. If nothing is specified, the root is usually 16px. When you change the font size of the root, the size of the rem specified for each element will also be changed at once.


Why it is better to use rem instead of px?
==========================================

### Font size:
If the font size is specified in px, it will not be affected when the font size setting in the browser's function is changed, so the user will not get the expected scaling behavior.
There may not be many people who use this setting, but there is a usability problem if the font does not work as expected by the user.
However, it is difficult to manage the size of the parent element if it depends on the size of the parent element like em or %, and if you use vw, the size will be extreme depending on the display size and visibility will be poor in many cases.
If you use vw, the size may be too large depending on the display size, which may lead to poor visibility. Therefore, it is safe to use rem here.

### Padding, Margin:
If you use rem, when you change the font size setting of your browser, the elements and margins will also change relatively.
The bottom line is that it will behave in the same way as when you use the zoom function of the OS, so the layout will be less likely to break.

### However...
Elements that you do not want to change, such as borders:
For elements that you do not want to change in size or thickness even if the browser width changes, such as borders and shapes, px is appropriate.
