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
	addItem: function(email, item, cb) {
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.run("INSERT INTO user_item VALUES(?,?,?)", [email, item.i_id, 1], callback);
			}
		],cb);
	},
	updateItem: function(email, item, cb) {
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.run("UPDATE user_item SET quantity = quantity+1 WHERE email=? AND i_id=?)", [email, item.i_id], callback);
			}
		],cb);
	},
});

exports.UserItem = new UserItem();