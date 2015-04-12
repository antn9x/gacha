var Backbone        = require('backbone');
var async 			= require('async');
var _        		= require('underscore');
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
		var _self = this;
		var db;
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (_res, next) {
				db = _res;
				_self.getItemsByEmail(email, next);
			},
			function (userItems, callback) {
				var found = _.find(userItems, function (ui){return ui.i_id==item.i_id;});
				console.log(JSON.stringify(found));
				if(found){
					db.run("UPDATE user_item SET quantity = ? WHERE email=? AND i_id=?", [found.quantity +1 , email, item.i_id], callback);
				} else {
					db.run("INSERT INTO user_item VALUES(?,?,?)", [email, item.i_id, 1], callback);
				}
			}
		],cb);
	},
});

exports.UserItem = new UserItem();