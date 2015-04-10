var Backbone        = require('backbone');
var async 			= require('async');
var SQLiteSingleton	= require('./SQLiteSingleton').SQLiteSingleton;

var Users = Backbone.Model.extend({

	initialize: function () {
		// body...
	},
	checkLogin: function(data, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.get("SELECT * FROM users WHERE email=?", data.email, callback);
			}
		],cb);
	},
	addNewUser: function (data, cb) {
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				var current  = new Date().getTime()/1000 >> 0;//second
				db.run("INSERT INTO users VALUES (?,?,?,?,?)", [data.email, data.password, 5000, current, current], callback);
			}
		],cb);
	},
});

exports.Users = new Users();