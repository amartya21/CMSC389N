# JavaScript

## HTML

- Tables
  - `<table>`: table includes this tag and at least one of the below
  - `<tr>`: defines a table row
  - `<th>`: defines a table header
 
```html
// Defines table with two rows and three columns
<table>
  <tr>
    <th>Month</th>          // table header
    <th>Savings</th>        // table header
  </tr>
  <tr>
    <td>January</td>        // table cell
    <td>$100</td>           // table cell
  </tr>
  <tr>                      // table row
    <td>February</td>
    <td>$80</td>
  </tr>
</table>
```

- Lists
  - `<ul>`: unordered list elements have no numbering
  - `<ol>`: ordered list elements have numbering

```html
// Ordered list of three elements

<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>

// Unordered list of three elements

<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

## Global Objects

- window: first thing that gets loaded into the browser (properties like length, innerWidth, innerHeight, name)
- document: loaded inside the window object (properties like title, URL, cookie)

## DOM

- tree-like structure representing the page where HTML elements are nodes

## Arrays

- Methods
  - `push()`: appends element to end of array
  - `pop()`: removes element from end of array
  - `reverse()`: reverses the array and returns the reversed array
  - `concat()`: concatenates the two arrays and returns new concatenated array
  - `shift()`: sets array reference to point to elements at indices [1, n] and returns 0th element
  - `unshift()`: adds item(s) to the beginning of the array and returns the length of the new array
  - `indexOf()`: returns the index of the value passed in or -1 if that value doesn't exist in the array
  - `slice()`: returns a new array (shallow copy) including start index and excluding end index (interval [start, end))
- length: gives size of array even if all elements aren't filled (i.e. array w/ 100 elements but values at indices 1, 2, 99)

## Var/Let/Const

- `var`: variable is function-scoped and hoisted (can be used before declaration in the same scope)
  - keep in mind that a hoisted variable can be used before initialization but it will be undefined 
- `let`: variable is block-scoped and not hoisted (cannot be used before delcaration)
  - functions in the form `function a(){}` are hoisted 
  - functions in the form `let a = function(){}` are not hoisted
- `const`: variable value cannot be changed after initialization and variable is block-scoped

## Null/Undefined/NaN

- `null`: variable has been explicitly assigned `null` value
- `undefined`: variable has been declared but is uninitialized
- `NaN`: variable is not a number and cannot be coerced into a number (i.e. `""` can be coerced into the number 0)


## \==/===

- `==`: equality is checked after any necessary type conversions have been performed
- `===`: equality is checked without any type conversions being performed

## Functional Programming

- `map()`: creates a new array with the results of calling a provided function on every element of the calling array
- `filter()`: creates a new array with all elements that pass the test implemented by the provided function
- `reduce()`: applies function against accumulator and array elements (from left to right) to reduce to a single value
  - first argument is function
  - second argument is initial value
- `sort()`: pass in comparison function in order to sort array by custom comparator
  - `function (a, b) {}` is the comparison function
  - if returned result negative, then a is sorted before b
  - if return result positive, then a is sorted after b
  - sorts array values as strings by default (i.e. 25 comes after 100 because 2 is bigger than 1)

## IIFEs

- Invoked immediately after declaration (do not need to be separately invoked)

```javascript
(function (x, y) {
    console.log(x * y);
} (4, 6));
```

## Function Context

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context
- always look to the left of a function invocation to determine what `this` is
- `this` only depends on the way the function is invoked (NOTHING else)
- the `this` of arrow functions is the `this` of the outer lexical context
- solutions:
  - arrow function
  - self/that trick
  - use bind

## Query Selectors

```javascript
// matches the first element in the DOM with the id foo
document.querySelector("#foo");
    
// matches first element in the DOM with the class bar
document.querySelector(".bar");
```

## Event Propagation

- events "bubble up" by passing event up the DOM tree (event propagation starts at innermost element)
- events "capture" by passing event down through DOM tree (propagation starts at outermost element)
- propagation only happens if event listeners on nested elements are for the SAME event (i.e. "click")

```javascript
// addEventListener default is to enable bubbling
document.getElementById("OuterElement").addEventListener("click", () => alert("OuterElement"));
document.getElementById("InnerElement").addEventListener("click", () => alert("InnerElement"));
document.getElementById("WayInnerElement").addEventListener("click", () => alert("WayInnerElement"));

// adding true as the third argument to addEventListener() enables capturing
document.getElementById("OuterElement").addEventListener("click", () => alert("OuterElement"), true);
document.getElementById("InnerElement").addEventListener("click", () => alert("InnerElement"), true);
document.getElementById("WayInnerElement").addEventListener("click", () => alert("WayInnerElement"), true);
```

## JS Objects

- searching along prototype chain until desired property/function found is called the *delegated pattern*

```javascript
// Example of inheritance

// Object-specific data that all Students should have
function Student(name, credits, courses) {
    this.name = name;
    this.credits = credits;
    this.courses = courses;
}

// Data and functions to be inherited by all subclasses of Student        
Student.prototype = {
    constructor: Student,  
    college: "UMCP",
    info: function() {
        document.writeln("Name: " + this.name);
        document.writeln(", Credits: " + this.credits);
        document.writeln(", Courses: " + this.courses + " ");
        document.writeln(", College: " + this.college + "<br />");
    }
};

function GradStudent(name, credits, courses, advisor) {

	// Calls super class constructor
    Student.call(this, name, credits, courses);
    
    this.advisor = advisor;
}

// Setting GradStudent prototype to Student
GradStudent.prototype = new Student();

// Setting constructor property on GradStudent prototype
GradStudent.prototype.constructor = GradStudent;

// Adding a GradStudent-specific function on GradStudent prototype
GradStudent.prototype.getAdvisor = function() { return this.advisor; }
```

```javascript
// Custom implementation of the new keyword

function customNew(constructor) {
    
    // Step 1 - create blank/empty object
    let obj = {};

    // Step 2 - set prototype of obj to constructor prototype
    Object.setPrototypeOf(obj, constructor.prototype);

    // Step 3 - invoke constructor with apply setting obj to be this
    constructor.apply(obj, Array.from(arguments).slice(1));

    // Step 4 - return object (or object that constructor function explicity returns)
    return obj;
}

let customStudent = customNew(Student, "Stefan", "Edberg");
````

- prototype pattern: adding all properties and functions on the prototype (con: modifying prototype affects all objects)
- constructor pattern: adding all properties and functions in constructor (con: duplicates all shared data unnecessarily)
- default pattern: object-specific properties/functions in constructor and shared properties/functions on prototype

## Classes

```javascript
class Student {
    
    	// Student constructor function
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	
	// Function on Student prototype
	toString() {
		return this.name + " " + this.age;
	}
	
	// Function on Student prototype
	getName() {
		return this.name;
	}
	
	// Can be called like Student.getCollegeName()
	static getCollegeName() {
		return "UMCP";
	}
}
```
