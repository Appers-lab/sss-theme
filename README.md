
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


Using Canvas Theme
============================
In some of the tasks we use a theme called *Canvas* as a model. We do not include anything of its code, but only refer to that as a starting point of how things should look like. You may read its code but eventually you need to produce/reproduce its components from scratch by coding. Dowload this theme from [This link](https://drive.google.com/file/d/1lNdPJPjFbvhf7WCYtgcIFwR5M-CbfyQ5/view?usp=sharing)

That's a big zip file. Once you unpack it, all the html pages can be found at `/Package-HTML/HTML`. I would refer to some pages in this folder and some componens withing these pages and ask you to make something similar to that (with some modification) 