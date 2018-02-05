# React app with Flux pattern

Following along with Pluralsight's 'Building Applications with React & Flux' course.

Instructors source: https://github.com/coryhouse/react-flux-building-applications

## Lifecycle Methods

### componentWillMount() 
- before init render (on server & client)
- good for setting init state

### componentDidMount()
- after render
- able to access DOM/call APIs/set timers, etc 

### componentWIllReceiveProps()
- when getting new props (not called on init render so good for changes) 
- set state pre-render

### shouldComponentUpdate()
- before render when new props/state change (not called on init render)
- good for optimizing performance since returning false here will cancel a re-render of the component.

### componentWillUpdate()
- immediately before rendering on new props/state change (not init render)
- good for preparing for the update when it is required.
- NOTE: can't call setState during this method.

### componentDidUpdate()
- after components updates are flushed to DOM (not on init render)
- good for working with the DOM after an update.

### componentWillUnmount()
- immediately before component is removed from DOM
- good for cleanup.

#### REM: 
- when creating dynamic children (foreach of component instances), a key for each instance must be provided so React can monitor changes and update the correct instance.

## Controller Views

- top level component (components nested within in)
- sets props of children (which immutable so it can't be chaned by them)
- interacts with flux stores 
- NOTE: it's not recommended to nest controller views in other components (could cause performance issues with render updates)

### Controller Views = Smart (keeps state), Regular Components = Dumb (receive props)
Controller views can be thought of smart components that keep state for the view (or the entire app). Their render() function should pass whatever state they have into properties that can be used by Functional/Dumb components. These will render html markup using their properties which takes that work out of the controller view and makes the component reusable.

## Prop Types 

These are a good way to express what the given component EXPECTS in the property object (including property types) to work correctly. 

### Prop Validation

If a property passed into props is of a wrong type, an error will be logged to the console to make for easy debugging. 

#### NOTE: this validation is not run in production (to optimize performance) so it should be used more for documenting your development. 


### Mixins

Good for cross-cutting concerns, i.e. sharing code between components.