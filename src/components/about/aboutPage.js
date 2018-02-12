'use strict';

var React = require('react');

var About = React.createClass({
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
    },
    render: function() {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This app uses the following technologies: 
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                        <li>Browserify</li>
                        <li>Bootstrap</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;