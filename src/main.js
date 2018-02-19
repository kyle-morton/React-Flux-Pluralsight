"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

//NOTE: This file bootstraps the entire app. Any init actions can go here to get things started.
InitializeActions.initApp();

//adding the Router.HistoryLocation param will convert urls from /#/about to /about
Router.run(routes, Router.HistoryLocation,  
function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});
