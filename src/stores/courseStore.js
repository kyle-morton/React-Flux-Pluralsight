'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); //ponyfill for object.assign ES6 feature
var _ = require('lodash');
var CHANGE_EVENT = 'change';


var _courses = []; //private courses

var CourseStore = assign({}, EventEmitter.prototype, {

    //these are the public API for the store

    addChangeListener: function(callback) {
        //'hey, let me know when this store changes'
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        //'hey, I don't need updates on this store anymore'
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getAllCourses: function() {
        return _courses;
    },
    getCourseById: function(id) {
        return _.find(_courses, {id: id}); //use lodash to search array for course with id
    }
});

//registers our store with dispatcher
Dispatcher.register(function(action) {
    //called any time ANY action is dispatched

    //determine which type of action it is, then process as needed
    switch(action.actionType){
        case ActionTypes.INITIALIZE: 
            _courses = action.initialData.courses; //getting from InitializeActions
            CourseStore.emitChange();
            break;
        case ActionTypes.CREATE_COURSE: 
            _courses.push(action.course); //pushing new course to private array
            CourseStore.emitChange(); //tell components to update
            break;
        case ActionTypes.UPDATE_COURSE:
            var existingCourse = _.find(_courses, {id: action.course.id});
            var index = _.indexOf(_courses, existingCourse);
            _courses.splice(index, 1, action.course);
            CourseStore.emitChange();
            break;
        case ActionTypes.DELETE_COURSE:
            _.remove(_courses, function(course) {
                return action.id === course.id;
            });
            CourseStore.emitChange();
            break;
        default:
            //nothing to do
            break;
    }

});

module.exports = CourseStore;