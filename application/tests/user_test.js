//var express = require('express');
//var app = express();
var testCase  = require('nodeunit').testCase;

module.exports = testCase({
    "Create user object": function(test) {
    	var userModel = require(__dirname + '/../model/user.js');
        test.ok(typeof userModel !== 'undefined');

        var userData = {
        	'username' : 'Mike', 
        	'email' : 'mike@mail.com',
        	'password' : 'salasana'
        };

        var userObject = userModel.createObject(userData);
        test.ok(typeof userObject !== 'undefined');
        test.ok(userObject.username === 'Mike');
        test.ok(userObject.email === 'mike@mail.com');
        test.ok(userObject.password === 'salasana');
        
        test.done();
    },
    "Insert user object": function(test) {
        var userModel = require(__dirname + '/../model/user.js');

        var userData = {
            'username' : 'Mike', 
            'email' : 'mike@mail.com',
            'password' : 'salasana'
        };

        userData.password = userModel.encodePassword(userData.password);
        userModel.create(userData);
        
        test.done();
    },
    "Find one user object": function(test) {
        test.expect(2);
        var userModel = require(__dirname + '/../model/user.js');
        var userData = {
            'username' : 'Mike', 
            'email' : 'mike@mail.com',
            'password' : 'salasana'
        };

        userData.password = userModel.encodePassword(userData.password);
    
        userModel.create(userData, function(id) {
            test.ok(id !== null);
            userModel.fetchById(id, function(err, doc) {
                test.ok(doc !== null);
                test.done();
            });
        });

    },

});
