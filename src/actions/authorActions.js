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

    }
};

module.exports = AuthorActions;