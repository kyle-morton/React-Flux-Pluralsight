'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {

    createCourse: function(course) {
        
        var newCourse = CourseApi.saveCourse(course);
        
        //creates action and sends to dispatcher to broadcast
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });

    },
    updateCourse: function(course) {
        
        var updatedCourse = CourseApi.saveCourse(course);
        
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_COURSE,
            course: updatedCourse
        });

    },
    deleteCourse: function(id) {
        CourseApi.deleteCourse(id);
        
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    }
    //REM: since these will be async methods, you can have 2 events fire 
    //1st -> deleteCourse - shows the loading UI
    //2nd -> deletedCourse - shows confirmation (after ajax call completes)
};

module.exports = CourseActions;