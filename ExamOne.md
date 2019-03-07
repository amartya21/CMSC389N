# CMSC 389N Exam One Study Guide

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
- Length: gives size of array even if all elements aren't filled (i.e. array w/ 100 elements but values only at indices 1, 2, 99)

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
