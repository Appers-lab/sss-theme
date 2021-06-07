
General instructions:
======================================
Before do the task make sure you have read the design guide (css-guide.md) in the doc folder of the project folder. Note that this is a [markdown](https://guides.github.com/features/mastering-markdown/) document (you need to learn what markdown is and will require writing markdown docs yourself.)

The tasks are posted in the project page (link given to you through email). Your also assigned a branch (based on your name) to work in. Your branch name is also given to you through email. When you are assigned a task: 

* Clone your branch (refer to the next section for a handy guide on Git)
* Do your task
* Commit and push the changes to the branch and make a pull request
* If you have any question/problem about the task tag me on the pull request.
* If you have a general question make a new issue (in the repository) and tag me there.
* I will review your pull request, make comments there, and you will apply the comments. Once the changes are ok we will merge it and your task is done. 
* Throughout the review process there would be new concepts/topics, and you may be asked to read some articles to learn more about them, and sometimes you may need to write a brief summary of what you learned.


Quick start with Git
===============================

### To clone a branch:

```
git clone https://github.com/Appers-lab/billihomes-frontend.git

cd frotnend

git checkout <your-branch>
```

Or alternatively you can combine the above two command into one:

```
git clone -b <your-branch> https://github.com/Appers-lab/billihomes-frontend.git

cd frotnend
```

You may need to enter your username/password (your github account).

Note that using `git checkout` you can switch between branches. Before doing project make sure you are in your branch. To double-check which branch you are in, from the project root run:

```
git branch
```

The above command shows a list of branches downloaded with the current branch having a * beside it.


### Commit/Push changes
Once you made your changes you need to push the changes to the bitbucket repository. From the project root folder:

```
git add .
git commit -m "your commit message"
git push
```

Then using browser login to your bitbucket account, go to this repository section and create a "pull request". When you create a pull requet, I (and others) can see what changes you made in your branch and give you feedback. You may need to make additional changes and push again (using the commands above). When we approve your changes then we will "merge" your changes into the main branch, and basically your code will be incuded in the main version of the program. 

### Pull changes - conflict resolution

To download the latest changes from the online repository (upstream repo) to your local use the following command from the project root:

```
git pull
```

The above command is useful if you have an old clone of the repository and some changes are made to the online repo after your cloning. In this case use the above command instead of cloning a whole new project.

Sometimes it may so happen that while you are working on your branch we push/merge some new changes in the main branch. To get these changes in your branch you need to "pull" changes from the main branch to your branch:

```
// making sure you are in your branch
git checkout <your-branch>

git pull origin main

```

If conflicts happen, then the above command shows a list of conflicted files. These files will contain "conflict-markers". You need to open these files using some IDE editor (like VS code or WebStorm) and these editors will show you the conflicting parts and ask you to choose one of the possible options for each conflict (by clicking on buttons). Once you resolve these conflicts save your files. Then commit/push again to your branch (see the previous section) and the conflicts are resolved.

Using SCSS
===================================

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

Then everytime you make a change to a .scss file in the -sass folder the result will automatically compiled to css file (bundle.css) in the css folder. If you got *permission deny error* while trying to run this script, it is probably because you need to add *execution permission* to this script:

```
sudo chmod +x sass-start
```

Now you can start editing teh scss files and see the results live by including the `css/bundle` file in a html file.


Notes on doing tasks
===========================
Each task will have a folder after its three digit index number in the path `/tasks` (like `/tasks/task-007` for Task 7). Feel free to add/modify file within this folder. Usually there is an html file within this folder which is used to show the component/items you have designed. In otehr words, this file serves as a demo of your work and it is important that it has a good presentation of the component/items you designed. So we have to add some meaninful content to that (similar to what html theme packages do). A convention of frontend designers is to use the well-known [Lorem Ipsum](https://www.lipsum.com/) text to present a sample text.


Using Canvas Theme
============================
In some of the tasks we use a theme called *Canvas* as a model. We do not include anything of its code, but only refer to that as a starting point of how things should look like. You may read its code but eventually you need to produce/reproduce its components from scratch by coding. Dowload this theme from [This link](https://drive.google.com/file/d/1lNdPJPjFbvhf7WCYtgcIFwR5M-CbfyQ5/view?usp=sharing)

That's a big zip file. Once you unpack it, all the html pages can be found at `/Package-HTML/HTML`. I would refer to some pages in this folder and some componens withing these pages and ask you to make something similar to that (with some modification)

Using Bootstrap icons
=================================
To be on the same page, lets use bootstrap icons for all the designs. The bootstrap icons are downloaded in the folder `/font`. To include them in your html files just include the file `bootstrap-icons.css` in the header:

```html
<link rel="stylesheet" href="../../font/bootstrap-icons.css">
```

And then use the icons, like:

```html
<i class="bi bi-alarm"></i>
```

See [here](https://icons.getbootstrap.com/) for a complete list of icons and their class name. 