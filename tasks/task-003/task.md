Standardadize project.scss
=============================
You may notice that the current scss files (layouts, styles, projec) are not following the standards outlined in the design guide. In this task we modify some parts of _project.scss to comply with BEM and our SMACSS rules outlined in the guide.

Files expected to change: (DO NOT modify any file other than these)
- -sass/_project.scss
- -sass/_styles.scss

> **IMPORTANT** Keep a list of all the class name changes (old name -> new name) so that later on we can update the classes in htmls files as well. Write this list at the end of this md file

### Step 1 (warmup): 
Move all the mixins in _projects.scss to _styles.scss. Note that this file is divided into sections (by `/* section name ======== ...`). For now ignore the "Basic" section. 

Move the following items to styles.scss:

- modal section: without changing class names; they are indeed layer 0 classes being styled here.
  

- `.re-content`: rename to s-content
  

- `.re-qmark`: rename to s-qmark
  

- `.re-required`: rename to s-required

### Step 2:
Modify the following classes (within _project.scss) to make them comply with BEM rules:

- `#search-page-menu` -> rename to ss-search-page-title-bar

- `.\$banner` -> rename to ss-banner

- `prop-card2` -> rename to ss-prop-card

Class names change log
-----------------------------------
- `.re-content` -> `.s-content`

- `.re-qmark` -> `.s-qmark`
  
- `.re-required` -> `.s-required`

- `#search-page-menu` -> `.ss-search-page-title-bar`

- `.\$banner` -> `.ss-banner`

- `prop-card2` -> `.ss-prop-card`