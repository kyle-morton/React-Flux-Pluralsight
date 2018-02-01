// 'use strict'; -> not using to overcome the global $/jQuery variable issue

$ = jQuery = require('jquery'); //access jquery thru '$' or 'jquery' word

var React = require('react');
var Home = require('./components/homepage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

var App = React.createClass({
    render: function() {
        var Child; // which child component to render

        switch(this.props.route) {
            case 'about': Child = About; break;
            default: Child = Home;
        }

        return (
            <div>
                <Header />
                <Child />
            </div>
        );
    }
});

function render() {
    console.log('render...');
    var route = window.location.hash.substr(1);
    console.log('route: ' + route);
    React.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();

// React.render(<Home />, document.getElementById('app'));