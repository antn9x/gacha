var Backbone        = require('backbone');
var async 			= require('async');
var SQLiteSingleton	= require('./SQLiteSingleton').SQLiteSingleton;

var UserItem = Backbone.Model.extend({
	
	initialize: function () {
		// body...
	},
	getItemsByEmail: function(email, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.all("SELECT * FROM user_item WHERE email=?", email, callback);
			}
		],cb);
	},
});

exports.UserItem = new UserItem();