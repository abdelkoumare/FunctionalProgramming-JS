# FunctionalProgramming-JS
A full example of how to work implement functional Programming with JS
Here are the question Solved in this example 


We can generalize the car, and cdr functions to construct a family of accessors, c: : :r, where the “: : :” 
is an arbitrary combination of a’s and d’s. Each a means to return the first element, and each d means to
return the second element of the given pair, read right to left.
For example, cadr returns the car of the cdr of the input pair:
cadr(cons(a,(cons(c,(cons(d,null)))))) = c
Define a generic constructor cXXXr function which can create any of such function. Your code should
accept a single parameter, a (possibly empty) string consisting of only a’s and d’s, and it should return a
function which extracts the appropriate element from a cons-list/tree in the way the string specified.

2. Of course we need some interesting lists with which to test the function you build in the above question. 
The file q2setup.js includes code to generate a tree with a random structure. It returns an object containing
a non-empty tree (ie the root pair), and the name of an arbitrary element in that tree.
Write a function makeXXX(tree,s). This function receives a tree and a string (which it certainly
contains), and should search the tree for the given string, returning the string you would pass to your
cXXXr function from the first question to access the corresponding element. That is,
cXXXr(makeXXX(tree,s))(tree) == s

3. The show function returns a string describing a recursively defined pair. It would be useful to be also 
able to go in the other direction too. Define a function wohs which accepts a single string parameter
and returns the corresponding, recursively constructed cons structure. You may assume the list is wellformed
in the sense that each list ends in a (), and that actual elements are composed of alphanumeric
strings. It should be the case that for any tree t,
show(wohs(show(t))) == show(t)

4. You are given a list, which you need to partition into a list of lists based on different criteria. For instance, 
given a list of random integers, you may need to return a list of two lists, the odds and evens.
Define a function partition which takes a list and an arbitrary number of functions as parameters,
and returns a list of lists, where each sublist contains only and all elements for which the corresponding
function returns true if passed that element. The returned list of lists should respect the order of the input
functions, and individual sublists should preserve the original order of elements in the input list.

5. JavaScript uses associative arrays. Show how to build up that functionality from cons pairs. Define the 4
following functions.
 constructAA() Returns a new, empty associative array.
 addAA(aa,key,value) Adds the given mapping to the associative array and returns the new
associative array. If the key already exists it is overwritten.
 getValueAA(aa,key) Returns the value associated with that key, or null if not found.
 showAA(aa) Returns a formatted string showing the key:value mappings in the given associative
array. This should be a multiline string with each mapping on a separate line, separating key
from value by a colon
