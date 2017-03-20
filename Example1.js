
/*

Abdel Koumare 


*/

// ---------------------------------------My Code-----------------------------------------------------------------------------------------

/* 
Question 1 : 
Define a generic constructor cXXXr function which can create any of such function. Your code should
accept a single parameter, a (possibly empty) string consisting of only a’s and d’s, and it should return a
function which extracts the appropriate element from a cons-list/tree in the way the string specified.
*/

function cXXXr(string1){ // we create the function cXXXr wich takes a string composed of "a" and "d" as input

    return function cXXXr2(list){  // inner returned function cXXXr2 that takes as input a list or a tree

            function cXXXr3(str, list){

                if(str.length==0){ // this if statement is to return the list if the imput is empty
                    return list;
                }

                else if(str.charAt(str.length - 1)== "a"){  // condition to check from right to left if it is "a" has to take the car

                    return cXXXr3(str.substr(0, str.length-1), car(list)) // recursively call cXXXr3 each time it will consdier the letter before
                }

                 else if(str.charAt(str.length - 1)== "d"){  // condition to check from right to left if it is "a" has to take the cdr

                    return cXXXr3(str.substr(0, str.length-1), cdr(list)); // recursively call cXXXr3 each time it will consdier the letter before
                }
            } // end of cXXXr3

            return cXXXr3(string1,list);

    }
}

// Example 
var list = cons("a",(cons ("c",cons("d", null))));

console.log(" Test case for question 1 \n "+show(list));

console.log(cXXXr("ad")(list));


/* Question 2 :
Of course we need some interesting lists with which to test the function you build in the above question. 10
The file q2setup.js includes code to generate a tree with a random structure. It returns an object containing
a non-empty tree (ie the root pair), and the name of an arbitrary element in that tree.
Write a function makeXXX(tree,s). This function receives a tree and a string (which it certainly
contains), and should search the tree for the given string, returning the string you would pass to your
cXXXr function from the first question to access the corresponding element. That is,
cXXXr(makeXXX(tree,s))(tree) == s
*/

function makeXXX(tree,s){

    function findPath(tr, direction){

        if(tr== s) {     // This is the base case to see if we found the string we were looking for in the tree
            return direction; // returns the direction composed of "a" and "d"'s that gives the path to the string in the list
        }
        else if (isList(tr)){

            var path1 = findPath(car(tr), direction + "a"); // check the car
            var path2 = findPath(cdr(tr), direction + "d"); // check the cdr


            if(path1){
             return path1 ;
                    }
            else if(path2){

                return path2;
                    } 
        }
        return null ;
    }

    var pathWay = findPath(tree,"");


    function pathHelper(string, index) // This function helps us to reverse the order of the "a" and "d" since cXXr reads right to left
    {
        if(index >= 0)
            return string.charAt(index) + pathHelper(string, index-1);
        else return "";
    }
 
    return pathHelper(pathWay, pathWay.length - 1);

}

// Example for q2

var listEx = cons("a", cons("b",cons("c", null)));

console.log(" \n Example question 2 \n" );
console.log(show(listEx));


console.log( "This is the path :" + makeXXX(listEx, "c"));

console.log("Using cXXXr we retrieve it from the list \n " + cXXXr(makeXXX(listEx, "c"))(listEx)) ;

/*
Question 3 :
The show function returns a string describing a recursively defined pair. It would be useful to be also 
able to go in the other direction too. Define a function wohs which accepts a single string parameter
and returns the corresponding, recursively constructed cons structure. You may assume the list is wellformed
in the sense that each list ends in a (), and that actual elements are composed of alphanumeric
strings. It should be the case that for any tree t,
show(wohs(show(t))) == show(t)
*/

function wohs(string) 
{
    
    
        function indexReturn (str, i, count) // This function returns the index of the closing parethesis
    {
       
        if((count == 0) && i > 1) // If the counter is null but the index >1 return the index this means we have reach the end of the list
            return i;

        if(str.charAt(i) == '(')  // we verify if it's an opening parentheses increment counter
            return indexReturn(str, i+1, count+1);

        else if (str.indexReturn(i) == ')')  // If it's a closing parentheses decrement counter
            return indexReturn(str, i+1, count-1);
        else 
            return indexReturn(str, i+1, count) ;// This is to continue our recursion when it enconters other elements than ")" and "("
        }
    
        if (string == '()')  // This is a return a "null" to build our cons
            {
                return null ;
            }

        else if ((string.indexOf('(') == -1) && (string.indexOf(')') == -1)) { // Check for alphanumerical strings without ()
            return string;
        }
    
        // This part helps us finding substrings (()) and then callign indexRetrun to continue the process 

        var sublistFinder = (string.charAt(0) == '(' && string.charAt(1) == '(') ? indexReturn(st, 1, 0) : string.indexOf(' ');
    
  
        var half1 = string.substring(1, sublistFinder); // gets the elements before the substring
        // Get the second half/sublist of the string
        var half2 = string.substring(sublistFinder+ 1, string.length - 1); // gets the elements after the substring
    
        
        return cons(wohs(half1), wohs(half2)); // using the cons operator we return the concatination of the two substrings

}
// Example for q3 

var listEx3 = cons("a", cons("b",cons("c", null)));

console.log("This is an example for Q3 \n" + show(wohs(show(listEx3))));

console.log( show(listEx3));


/* Question 4 
You are given a list, which you need to partition into a list of lists based on different criteria. For instance, 
given a list of random integers, you may need to return a list of two lists, the odds and evens.

Define a function partition which takes a list and an arbitrary number of functions as parameters,
and returns a list of lists, where each sublist contains only and all elements for which the corresponding
function returns true if passed that element. The returned list of lists should respect the order of the input
functions, and individual sublists should preserve the original order of elements in the input list.

*/

function partition(list) // Function partition which takes as input a list 
{
    var arguments = Array.from(arguments); // I decided using arguments based on discussion with the TA

    function listOflist(list2, Array, i, counter)
    {
        if (Array[i] == null) {
            return null;
        }
        else{

            if(list2 == null)
            {
             return null;
            }

            if(Array[i](car(list2)))
            {
                var x = cons(car(list2), listOflist(cdr(list2), Array, i, counter+1)) 

                if(counter === 0){
                    return cons(x, listOflist(list2, Array, i+1, counter))
                }
                return x
            }
            
                var y = listOflist(cdr(list2), Array, i, counter+1)
                                if(counter === 0){
                    return cons(y, listOflist(list2, Array, i+1, counter))
                }
                return y
        }   
        
    }

    return listOflist(list, arguments, 1, 0)
}

function even(num)
{       
    if(num % 2 == 0) // reminder = 0 
    {
            return true;
    }
        else 
            return false;
}


function odd(num) // function to Check if a number is Odd or Even
{
    if(num % 2 == 1) // reminder = 1
        {
            return true;
        }
        else 
            return false;
}


function div5(num){

    if(num % 5 == 0)
        {
            return true;
        }
        else 
            return false;
}


function div10(num)
{
    if(num % 10 == 0)
    {
            return true;
        }
        else
         return false;
}

var listexx = cons(1, cons(2, cons(3, null)));

var r = partition(listexx, odd, even);

console.log("example 4 \n" + show(r));



/* 
Question 5 

JavaScript uses associative arrays. Show how to build up that functionality from cons pairs. Define the 
following functions.
- constructAA() Returns a new, empty associative array.
- addAA(aa,key,value) Adds the given mapping to the associative array and returns the new
associative array. If the key already exists it is overwritten.
- getValueAA(aa,key) Returns the value associated with that key, or null if not found.
- showAA(aa) Returns a formatted string showing the key:value mappings in the given associative
array. This should be a multiline string with each mapping on a separate line, separating key
from value by a colon. For example, the result of

showAA(addAA(addAA(constructAA(),"name","clark"),"age",10000))
would be:
name:clark
age:10000
Note that keys can be arbitrary strings, and values arbitrary data.

*/

function constructAA()
{
    return cons;
}

// addAA(aa,key,value) Adds the given mapping to the associative array and returns the new
//associative array. If the key already exists it is overwritten.

function addAA(aa, key, value)
{
    if(aa == constructAA()) 
        return aa(cons(key, value), null);

    else if(aa == null)
        return cons(cons(key, value), null);

    else if( typeof aa != 'function')
        return null;
    else 
        return cons(car(aa), addAA(cdr(aa), key, value));
}
    
var y = constructAA();
console.log(show(addAA(y, 'a', '1')));

// getValueAA(aa,key) Returns the value associated with that key, or null if not found

function getValueAA(aa, key)
{
    if(aa == null) 
        return null;

    if(!(isList(car(aa)))) // if the car ( the key) is not a list, we need a value not a list 
    {
        if(car(aa) == key) // if the car ()--> value is equal to the car 
            return cdr(aa) // return the value ( which is in the cdr)
        
    }
    else
    {
        var car1 = getValueAA(car(aa), key)  
        var cdr2 = getValueAA(cdr(aa), key)

        if(car1) 
            return car1;
        else
            if(cdr2) return cdr2;
        else 
            return null;
    }
}

var aaex = cons(cons('k', '2'), cons(cons('x', '6'), null));

console.log(getValueAA( aaex, 'x'));


//showAA(aa) Returns a formatted string showing the key:value mappings in the given associative
//array. This should be a multiline string with each mapping on a separate line, separating key
//from value by a colon. For example, the result of 

function showAA(aa)
{
    function formatShowAA(arg1, arg2) // takes the argument and the string of the aa
    {
        if(arg1 == null) // base case to return null for empty strings
         return "";

        if(!isList(car(arg1))) 
        {       
            arg2 = arg2 + car(arg1) + ":" + cdr(arg1) + "\n";
            return arg2;              
        }

        return formatShowAA(car(arg1), arg2) + formatShowAA(cdr(arg1), arg2)    
    }

    return formatShowAA(aa, "").replace(/\n$/, "") // to format the output 
}

// EXAMPLE showAA
console.log(showAA(addAA(addAA(addAA(constructAA(),"name","Abdel"), "FamilyName", "Koumare"), "age", 99)))




// ---------------------------------------Code Provided by the prof-----------------------------------------------------------------------

function cons(a,b) {
    return function (selector) {
        if (selector=='areyoualist?')
            return 'yesIam';
        return selector(a,b);
    };
}

function car(list) {
    function carHelper(a,b) {
        return a;
    }
    return list(carHelper);
}

function cdr(list) {
    function cdrHelper(a,b) {
        return b;
    }
    return list(cdrHelper);
}

function isList(thing) {
    if (typeof(thing)!='function')
        return false;
    try {
        if (thing('areyoualist?')=='yesIam')
        return true;
    } catch(e) {
    }
    return false;
}

function show(list) {
    var sval;
    if (list==null)
        sval = '()';
    else if (isList(list))
        sval = '('+ show(car(list)) +' '+show(cdr(list))+')';
    else 
        sval = String(list);
    return sval;
}

//------- Q2 Setup----------

// Construct a random tree based on pairs constructed using cons.
// Branches are deepened with probability p.
// Returns an object, with a "tree" field containing the random tree,
// and a "target" field containing a randomly selected, unique name
// within the tree.
function rndTree(p) {
    // Keep track of all names used, so we can ensure they are unique,
    // and also find a random name later too.
    var allNames = [];
    // The number of characters in a random string.
    var nameLength = 5;

    // Returns a random integer 0..max-1.
    function rndInt(max) {
        return Math.floor(Math.random() * max);
    }

    // Constructs a random string, as a tree element.
    function rndString() {
        // The set of characters from which the random name will be derived.
        var alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        // A recursive helper to progressively append n chars onto s.
        function helper(n,s) {
            if (n==0)
                return s;
            return helper(n-1,s + alphas.charAt(rndInt(alphas.length)));
        }
        var name = helper(nameLength,'');
        // Here we ensure the name just constructed is unique within the tree,
        // and if not we try again recursively.
        if (allNames.indexOf(name)>=0)
            return rndString();
        // Ok, unique, so record the name.
        allNames.push(name);
        return name;
    }

    // This function actually constructs the random tree, recursively deepening either the 
    // first or second of the pair with probability p.
    function rndTreeHelper(p) {
        return cons(
            (Math.random()<p) ? rndTreeHelper(Math.max(0,p-0.01)) : rndString(),
            (Math.random()<p) ? rndTreeHelper(Math.max(0,p-0.01)) : null);
    }
    
    var t = rndTreeHelper(p);

    return { target: allNames[rndInt(allNames.length)],
             tree: t };
}

// Example usage.
// 0.6 tend to work well, producing a variable but mostly reasonably sized tree.
var t = rndTree(0.6);
//console.log(show(t.tree)+"\n  "+t.target);


