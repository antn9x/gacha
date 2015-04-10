var Backbone        = require('backbone');
var async           = require('async');
var Items        	= require('./model/Items').Items;
var Users        	= require('./model/Users').Users;

var GachaServices = Backbone.Model.extend({
    initialize : function () {
        // body...
		console.log("gache");
    },
	getItemsByType : function (type, cb) {
		Items.getItemsByType(type, cb);
	},
	checkLogin : function (data, cb) {
		if(data.type == 0)
		Users.checkLogin(data, cb);
		else
		Users.addNewUser(data, cb);
	},
	register : function (data, cb) {
	}
});

exports.GachaServices = new GachaServices();