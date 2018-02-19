'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign'); //ponyfill for object.assign ES6 feature
var _ = require('lodash');
var CHANGE_EVENT = 'change';


var _authors = []; //private authors

//using object-assign to create our store, start with blank object (1st parameter),
//extend it using EventEmitter.prototype (2nd parameter),
//then define it using object (last parameter)
//Basically, this is using EventEmitter.prototype as our base class for the store
var AuthorStore = assign({}, EventEmitter.prototype, {

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
    getAllAuthors: function() {
        return _authors;
    },
    getAuthorById: function(id) {
        return _.find(_authors, {id: id}); //use lodash to search array for author with id
    }
});

//registers our store with dispatcher
Dispatcher.register(function(action) {
    //called any time ANY action is dispatched

    //determine which type of action it is, then process as needed
    switch(action.actionType){
        case ActionTypes.INITIALIZE: 
            _authors = action.initialData.authors; //getting from InitializeActions
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR: 
            _authors.push(action.author); //pushing new author to private array
            AuthorStore.emitChange(); //tell components to update
            break;
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, {id: action.author.id});
            var index = _.indexOf(_authors, existingAuthor);
            _authors.splice(index, 1, action.author);
            AuthorStore.emitChange();
            break;
        default:
            //nothing to do
            break;
    }

});

module.exports = AuthorStore;