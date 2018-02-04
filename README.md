# React app with Flux pattern

Following along with Pluralsight's 'Building Applications with React & Flux' course.

## Lifecycle Methods

###componentWillMount() 
before init render (on server & client), good for setting init state

###componentDidMount()
after render, able to access DOM/call APIs/set timers, etc 

###componentWIllReceiveProps()
when getting new props (not called on init render so good for changes), set state pre-render

###shouldComponentUpdate()
before render when new props/state change (not called on init render), good for optimizing performance since returning false here will cancel a re-render of the component.

###componentWillUpdate()
immediately before rendering on new props/state change (not init render), good for preparing for the update when it is required.
NOTE: can't call setState during this method.

###componentDidUpdate()
after components updates are flushed to DOM (not on init render), good for working with the DOM after an update.

###componentWillUnmount()
immediately before component is removed from DOM, good for cleanup.

REM: when creating dynamic children (foreach of component instances), a key for each instance must be provided so React can monitor changes and update the correct instance.