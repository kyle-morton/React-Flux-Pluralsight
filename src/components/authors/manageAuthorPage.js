"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./AuthorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var Toastr = require('toastr');

//REM: Controller view is the page itself that handles all child components
var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation //like using statements
    ],
    componentWillMount: function() {
        //this gets called before component gets rendered

        var authorId = this.props.params.id; //params added to props via react-router -> /author/:id
        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },
	statics: {
        willTransitionFrom: function(transition, component) {

			//if any of form filled out, check if they want to leave 1st
            if (component.state.dirty && !confirm('leave without saving?')) {
                transition.abort(); //stop the transition
            } 

            //if no abort(), request will go thru
        }
    },
    getInitialState: function() {
        return {
            author: { id: '', firstName: '', lastName: ''},
            errors: {},
			dirty: false
        };
    },
    setAuthorState: function(event) { //called for every key press
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value; //set state author's property that value
        return this.setState({ author: this.state.author});
    },
    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; //clear previous errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name must be at least 3 characters';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name must be at least 3 characters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors}); //update state with changes to errors object
        return formIsValid;
    },
    saveAuthor: function(event) {
        event.preventDefault();

        if (!this.authorFormIsValid()){
            return;
        }

        //send author to author actions to start Flux process

        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);
        }
        
        Toastr.success('Author Saved...');
        this.transitionTo('authors'); //transition to authors after save
        this.setState({dirty: false});
    },
	render: function() {
		return (
            <AuthorForm 
                author={this.state.author}
                onSave={this.saveAuthor}
                onChange={this.setAuthorState}
                errors={this.state.errors} 
            />
		);
	}
});

module.exports = ManageAuthorPage;