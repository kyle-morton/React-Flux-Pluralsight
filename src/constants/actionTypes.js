'use strict';

var keyMirror = require('react/lib/keyMirror');

//key will be copied to value by keyMirror library in react
module.exports = keyMirror({
    INITIALIZE: null,
    CREATE_AUTHOR: null,
    UPDATE_AUTHOR: null,
    DELETE_AUTHOR: null,
    CREATE_COURSE: null,
    UPDATE_COURSE: null,
    DELETE_COURSE: null
});