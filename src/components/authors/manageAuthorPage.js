"use strict";

var React = require('react');
var AuthorForm = require('./AuthorForm');

//REM: Controller view is the page itself that handles all child components
var ManageAuthorPage = React.createClass({
    getInitialState: function() {
        return {
            author: { id: '', firstName: '', lastName: ''}
        };
    },
    setAuthorState: function(event) { //called for every key press
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value; //set state author's property that value
        return this.setState({ author: this.state.author});
    },
	render: function() {
		return (
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState}
            />
		);
	}
});

module.exports = ManageAuthorPage;