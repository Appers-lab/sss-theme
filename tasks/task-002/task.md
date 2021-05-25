Standardadize Bootstrap5
=============================
The class *d-flex* in bootstrap and its responsive varioations (*d-sm-flex*, etc) all use css `!important` command which is very disturbing. By digging into boostrap5, figure out how to get rid of this `!important`. You also have to explain your solution at the end of this .md file

Files expected to change: (DO NOT modify any file other than these)
- -sass/bootstrap5/**

### Hint 1: 
Note that this class (and its reponsive variations) are part of *utility* classes that are defined in _utility.scss. But they are generated with some scss code rather than simple scss. The code automatically generates utility classes for all breakpoints (sm, md, lg, etc). You need to intercept the sass code and figure out how to remove `!important` for d-flex and all its variations.  

Your solution: how did you solve this problem
-------------------------------------------------
your answer here

In _utilities.scss (line52 and line59), if() function is used to define whether adding `!important` or not. In _variables.scss (line229), default value of *$enable-important-utilities* was true. So, I switched the default value to “false” to get rid of `!important` for *d-flex* and all its variations.
Also, there is the other way to control that. Instead of modifying _variables.scss file, we can switch the value of if() function in _utilities.scss such as if($enable-important-utilities, !important, null) -> if($enable-important-utilities, null, !important).