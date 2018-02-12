"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

//adding the Router.HistoryLocation param will convert urls from /#/about to /about
Router.run(routes, Router.HistoryLocation,  
function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});
