"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var Toastr = require('toastr');

//REM: Controller view is the page itself that handles all child components
var ManageCoursePage = React.createClass({
    mixins: [
        Router.Navigation //like using statements
    ],
    componentWillMount: function() {
        //this gets called before component gets rendered

        var courseId = this.props.params.id; //params added to props via react-router -> /author/:id
        if (courseId) {
            this.setState({course: CourseStore.getCourseById(courseId)});
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
            course: { id: '', title: '', author: '', category: '', length: ''},
            errors: {},
			dirty: false
        };
    },
    setCourseState: function(event) { //called for every key press
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value; //set state courses's property that value
        return this.setState({ course: this.state.course});
    },
    courseFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; //clear previous errors

        if (this.state.course.title.length < 3) {
            this.state.errors.title = 'Title must be at least 3 characters';
            formIsValid = false;
        }

        if (this.state.course.author.length < 3) {
            this.state.errors.author = 'Author must be at least 3 characters';
            formIsValid = false;
        }

        if (this.state.course.category.length < 3) {
            this.state.errors.category = 'Category must be at least 3 characters';
            formIsValid = false;
        }
        
        if (this.state.course.length.length < 1) {
            this.state.errors.length = 'Length must be at least 1 character';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors}); //update state with changes to errors object
        return formIsValid;
    },
    saveCourse: function(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()){
            return;
        }

        //send course to course actions to start Flux process

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }
        
        Toastr.success('Course Saved...');
        this.transitionTo('courses'); //transition to courses after save
        this.setState({dirty: false});
    },
	render: function() {
		return (
            <CourseForm 
                course={this.state.course}
                onSave={this.saveCourse}
                onChange={this.setCourseState}
                errors={this.state.errors} 
            />
		);
	}
});

module.exports = ManageCoursePage;