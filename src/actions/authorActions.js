'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {

    createAuthor: function(author) {
        
        var newAuthor = AuthorApi.saveAuthor(author);
        
        //creates action and sends to dispatcher to broadcast
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });

    },
    updateAuthor: function(author) {
        
        var updatedAuthor = AuthorApi.saveAuthor(author);
        
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: updatedAuthor
        });

    },
    deleteAuthor: function(id) {
        AuthorApi.deleteAuthor(id);
        
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        });
    }
    //REM: since these will be async methods, you can have 2 events fire 
    //1st -> deleteAuthor - shows the loading UI
    //2nd -> deletedAuthor - shows confirmation (after ajax call completes)
};

module.exports = AuthorActions;