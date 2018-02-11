'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

//using ES5 format (don't have to run thru Babel like w/ ES6)
var Home = React.createClass({
    render: function() {
        return (
            <div className='jumbotron'>
                <h1>Pluralsight Administration</h1>
                <p>React, React Router, Flux for ultra-responsive web apps.</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
});

module.exports = Home;