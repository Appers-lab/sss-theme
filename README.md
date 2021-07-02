
General instructions for developers
----------------------------------------
For general information please read these guides first:
- [Our general internship guide](http://appers-lab.com/guides/internship-general-project-instructions)
- [Quick start with Git](http://appers-lab.com/guides/quickstart-git)
- [Communication rule](http://appers-lab.com/articles/ccc)

Afterwards, read the [design system guide](http://appers-lab.com//guides/design-system). If your task is related to designing for mobile devices then you may need to take a look at the [mobile design system](http://appers-lab.com/guides/mobile-design-system) as well.


Using SCSS
---------------------
For a more detailed introduction to SCSS/SASS you may refer to their website, particularly [this link](https://sass-lang.com/guide) is a good place to start.

You need to have sass installed globally:

```
sudo npm install sass -g
```

Now run the script *sass-start* in the project root to begin a sass watch.

```
// from project root:
./sass-start
```

Then everytime you make a change to a .scss file in the -sass folder the result will automatically be compiled to css file (bundle.css) in the css folder. If you got *permission deny error* while trying to run this script, it is probably because you need to add *execution permission* to this script:

```
sudo chmod +x sass-start
```

Now you can start editing the scss files and see the results live by including the `css/bundle` file in a html file.


On html and demo files
--------------------------
Each task will have a folder after its name within the folder `/tasks` (like `/tasks/task-007` for Task 7). The rule is to use a three digit number for the task index, like 007 for 7, and the name becomes `task-007`. Feel free to add/modify files within this folder. It belongs to you to test your design. You can also add additional files to this folder such as images, videos, etc. Usually there is an html file within this folder which is used to show the component/items you have designed. In other words, this file serves as a demo of your work, and it is important that it has a good presentation of the components/items you designed. So we have to add some meaningful content to that (similar to what html theme packages do). A convention of frontend designers is to use the well-known [Lorem Ipsum](https://www.lipsum.com/) text to present a sample text.

See [here](https://icons.getbootstrap.com/) for a complete list of icons and their class name.