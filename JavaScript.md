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

- Window: first thing that gets loaded into the browser (properties like length, innerWidth, innerHeight, name)
- Document: loaded inside the window object (properties like title, URL, cookie)

## DOM

- Document Object Model: tree-like structure representing the page where HTML elements are nodes

## Arrays

- Methods
  - `reverse()`: reverses the array
  - `concat()`: concatenates the two arrays
  - `push()`: appends element to end of array
  - `pop()`: removes element from end of array
  - `shift()`: returns new array containing elements at indices [1, n]
  - `unshift()`: returns original array when called on new array after a shift
  - `indexOf()`: returns index of the value passed in or -1 if it doesn't exist in the array
  - `slice()`: returns a new array including start index and excluding end index (shallow copy if arguments omitted)
- Length: gives size of array even if all elements aren't filled (i.e. array w/ 100 elements but values at indices 1, 2, 99)

## Var/Let/Const

- `var`: variable is function scoped and hoisted (can be used before declaration in the same scope)
- `let`: variable is block scoped and hoisted (cannot be used before delcaration)
  - Functions in the form `function a(){}` are hoisted 
  - Functions in the form `let a = function(){}` are not hoisted
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
- `reduce()`: applies function against an accumulator and each array element (from left to right) to reduce to a single value
  - First argument is function
  - Second argument is initial value
- `sort()`: pass in comparison function in order to sort array by custom comparator
  - `function (a, b) {}` is the comparison function
  - If returned result negative, then a is sorted before b
  - If return result positive, then a is sorted after b
  - Sorts array values as strings by default (i.e. 25 comes after 100 because 2 is bigger than 1)

## IIFEs

- Invoked immediately after declaration (do not need to be separately invoked)

```javascript
(function (x, y) {
    console.log(x * y);
} (4, 6));
```

## Function Context

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#Function_context
- Always look to the left of a function invocation to determine what `this` is
- `this` only depends on the way the function is invoked (NOTHING else)
- The `this` of arrow functions is the `this` at which they were declared
- Solutions:
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

- Events "bubble up" by passing event up the DOM tree (event propagation starts at innermost element)
- Events "capture" by passing event down through DOM tree (propagation starts at outermost element)
- Propagation only happens if event listeners on nested elements are for the SAME event (i.e. "click")

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

- Searching along prototype chain until desired property/function found is called the *delegated pattern*

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

    // Step 4 - return object
    return obj;
}

let customStudent = customNew(Student, "Stefan", "Edberg");
````

- Prototype pattern: adding all properties and functions on the prototype (con: modifying prototype affects all objects)
- Constructor pattern: adding all properties and functions in constructor (con: duplicates all shared data unnecessarily)
- Default pattern: adding object-specific properties/functions in constructor and shared properties/functions on prototype

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
