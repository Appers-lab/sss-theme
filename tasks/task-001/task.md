
Standardadize Bootstrap5
=============================
You may notice that the current scss files (layouts, styles, projec) are not following the standards outlined in the design guide. In particular, the classes from Bootstrap5 that we include in the _layout.scss do not follow the BEM naming. In this task we modify some parts of Boostraps5 to comply with BEM. 

Files expected to change: (DO NOT modify any file other than these)
- -sass/bootstrap5/-nav.scss 

### Step 1: 
One of the boostrap5 files included in layout.scss is _nav.scss. Rename this file to _menu.scss instead (for nav is the wrong tag for what boostrap makes out of nav class, which is in fact a general purpose menu). Then rename the two modifier classes .--justified and .--fill (of .nav) to .menu--justified and .menu--fill (to comply with BEM convetion for modifiers). Test your result with the test.html file in this folder.

### Step 2:
Note that based on _menu.scss, the tag `<menu>` creates a horizontal menu (since display: flex). Now add a modifier `menu--column` to make the menu vertical (no flex). 
