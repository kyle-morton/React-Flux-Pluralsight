'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); //ponyfill for object.assign ES6 feature
var CHANGE_EVENT = 'change';


//using object-assign to create our store, start with blank object (1st parameter),
//extend it using EventEmitter.prototype (2nd parameter),
//then define it using object (last parameter)
//Basically, this is using EventEmitter.prototype as our base class for the store
var AuthorStore = assign({}, EventEmitter.prototype, {
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
    }
});

//registers our store with dispatcher
Dispatcher.register(function(action) {
    //called any time ANY action is dispatched

    switch(action.actionType){

    }

});

module.exports = AuthorStore;