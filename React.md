# React

## Props vs. State

- **props**: variables that are passed to a child component by a parent component (`this.props`)
  - props are effectively static and read-only in the child component
- **state**: variables that are initialized and managed by component itself (`this.state`)
  - state should never be mutated directly (use `setState()` instead)
  - state is private or local to component that is managing it
  
## Data Flow

- data flow in react is unidirectional (moves via props from parent components to child components)
- child can modify parent's state iff parent passes a reference to its `setState()` method via props
  
## Lifecycle Methods

### Mounting

- process of creating component instances and inputting actual elements into the DOM
- `constructor()`: called first in instantiating any class in JavaScript
- `render()`: outputs the representation of the component in JSX
- `componentDidMount()`: called exactly once immediately after `render()`
  - use case: don't call an API if your component doesn't end up getting put into the DOM (saves app from crashing)

### Updating

- process of updating actual elements that already exist in the DOM
- `render()`: run every time the state is changed with `setState()`
- `componentDidUpdate()`: called on every update immediately after `render()`

## Design Patterns

- `state` should never be mutated directly (all updates should happen through `setState()`)
- this immutability enables composition of components and higher order components
  - higher order component has a base (nested) component as an argument

## Example

```javascript
import React, { Component } from 'react';

class Counter extends Component {

  constructor() {
    super();
    this.state = { count: 10 };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  render() {
    return (
        <div>
          <button onClick={this.increment}> Increment </button>
          <p> Current count is: {this.state.count} </p>
          <button onClick={this.decrement}> Decrement </button>
        </div>
    );
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

export default Counter;
```

### Details

- component's `render()` can only have one top-level component 
- input element as `<Counter/>` in JSX if it has no children
- input element as `<Counter>...</Counter>` in JSX if it has children
- all class-based components must have a `render()` that returns something
- always export any components that you create so they can be used elsewhere
- constructors are required in class-based components only if there is state to be set and/or binding to be done
