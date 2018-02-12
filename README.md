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


## React-Router 

### Config

with React Router, you can configure your app routing from a single location. 

 	
~~~~
var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="authors" handler={require('./components/authors/authorPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
  </Route>
);
~~~~

### Params & QueryStrings

React Router will automatically place URL parameters and query strings in the props object for a component if configured in the <Route>.

~~~
<Route path"/course/:courseId" handler={Course}>

//url like this:
'/course/clean-code?module=3'

//the components props will be auto-populated:
var Course = React.createClass({
    render: function() {
        this.props.params.courseId; //'clean-code'
        this.props.query.module; //'3'
        this.props.query // '/course/clean-code/?module=3'
    }
});
~~~

### Links

Any routes to components within your config can be referenced via Links. This allows you to reference these routes and not have to use a static <a> and href in your code. This means any updates to a path can happen in one place instead of every single place that link is used in your app.
~~~~
<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
~~~~

### Redirects

React Router allows you to create redirects from old path to new path. The below additions to the routes config will send any requests going to /about-us to /about (1st line), send any requests to the mispelled /authurs to /authors (2nd line), and send any requests to a sub-directory /about/* to the /about page (3rd line). 

~~~~
    <Redirect from="about-us" to="about" /> 
    <Redirect from="authurs" to="authors" />
    <Redirect from="about/*" to="about" />
~~~~

### Transitions

Use the below methods to determine if page should be transitioned to (willTranstionTo()) or run checks before navigating away from a view (willTransitionFrom()). These are useful for checking if a user is logged in, has a given permission, checking if form is incomplete, etc. These can be very useful for stopping the user from navigating if a certain condition is met.

#### Note: See src/components/about/aboutPage.js for usage of these 2 static methods.

~~~ 
//this statics block is placed inside the component definition
statics: {
    willTransitionTo: function(transition, params, query, callback) {

        //logic here will determine if this page can be transitioned to
        if (!confirm('do you want to view this page?')) {
            transition.abort(); //stop the transition
        } else {
            callback(); //allows transition to occur
        }
    },
    willTransitionFrom: function(transition, component) {

        //logic here will determine if this page can be transitioned from
        if (!confirm('do you want to leave this page?')) {
            transition.abort(); //stop the transition
        } 

        //if no abort(), request will go thru
    }
}
~~~

### Locations (clean URLs)

A single param in the Router.run function call (Router.HistoryLocation) can convert your urls from using the hash syntax (/#/about) to clean, HTML5 urls (/about). This also creates a cleaner history in the browser. 

#### Note: this is not supported in IE prior to version 10. This config may also change in the 1.0 React-Router release.

~~~
//adding the Router.HistoryLocation param will convert urls from /#/about to /about
Router.run(routes, Router.HistoryLocation,  
function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});
~~~