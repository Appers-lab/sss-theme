
Quick start with Git
===============================

To clone a branch:

```
git clone -b <branchname> https://bitbucket.org/pmvald/frontend.git
```

You may need to enter your username/password (your bitbucket account).

Once you made your changes you need to push the changes to the bitbucket repository. From the project root folder:

```
git add .
git commit -m "your commit message"
git push
```

Then using browser login to your bitbucket account, go to this repository section and create a "pull request". When you create a pull requet, I (and others) can see what changes you made in your branch and give you feedback. You may need to make additional changes and push again (using the commands above). When we approve your changes then we will "merge" your changes into the master branch, and basically your code will be incuded in the main version of the program. 

Using SCSS
====================================
Run the script *sass-start* in the project root to begin a sass watch. 

```
// from project root:
./sass-start
```

Then everytime you make a change to a .scss file in the -sass folder the result will automatically compiled to css file (bundle.css) in the css folder. If you got *permission deny error* while trying to run this script, it is probably because you need to add *execution permission* to this script:

```
sudo chmod +x sass-start
```

Now you can start editing teh scss files and see the results live by incluing the `css/bundle` file in an html file.