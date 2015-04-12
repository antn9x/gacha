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
				db.get("SELECT * FROM users WHERE email=? AND password=?", [data.email, data.password], callback);
			}
		],cb);
	},
	getUserByEmail: function (data, cb){
		async.waterfall ([
			function (callback) {
				callback(null, SQLiteSingleton);
			},
			function (db, callback) {
				db.get("SELECT * FROM users WHERE email=?", [data.email], callback);
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
	spendMoney: function (data, cb) {
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				var current  = new Date().getTime()/1000 >> 0;//second
				db.run("UPDATE users SET coins =? WHERE email=?", [data.coins, data.email], callback);
			}
		],cb);
	},
	updateCoins: function (data, cb) {
		var db, newCoins;
		async.waterfall ([
			function (callback) {
				callback(null, SQLiteSingleton);
			},
			function (_res, callback) {
				db = _res;
				db.get("SELECT * FROM users WHERE email=?", [data.email], callback);
			},
			function (user, callback){
				var current  = new Date().getTime()/1000 >> 0;//second
				var elapsedTime = current - user.updated_at;
				newCoins = user.coins + elapsedTime * 1;
				db.run("UPDATE users SET coins =?, updated_at=? WHERE email=?", [newCoins, current, data.email], callback);
			}
		],function (err, res) {
			cb (err, newCoins);
		});
	},
});

exports.Users = new Users();