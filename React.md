# React

## Props vs. State

- **props**: variables that are passed to a component by a parent component (`this.props`)
  - props should never be changed in a child component
  - allow child components to access methods defined in parent
- **state**: variables that are initialized and managed by component itself (`this.state`)
  - state should never be mutated directly (use `setState()` instead)
  
## Lifecycle Methods

### Mounting

- process of creating component instances and inputting actual elements into the DOM
- `constructor()`: called first in instantiating any class in JavaScript
- `render()`: outputs the representation of the component in JSX
- `componentDidMount()`: called exactly once immediately after `render()`

### Updating

- process of updating actual elements that already exist in the DOM
- `render()`: run every time the state is changed with `setState()`
- `componentDidUpdate()`: called on every update immediately after `render()`

## Design Patterns

### Immutability

- `state` should never be mutated directly (all updates should happen through `setState()`)

### Composition

- nesting components to make code more modular 
- each component has a clearly specified function
