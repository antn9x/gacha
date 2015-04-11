var Backbone        = require('backbone');
var _        		= require('underscore');
var async 			= require('async');
var SQLiteSingleton	= require('./SQLiteSingleton').SQLiteSingleton;

var Items = Backbone.Model.extend({
	
	initialize: function () {
		// body...
	},
	getItemsByType: function(type, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.all("SELECT * FROM items WHERE rare=?", type, callback);
			}
		],cb);
	},
	getItemsByIds: function(ids, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				// console.log(ids);
				var slots = "";
				for (var i = 0; i < ids.length-1; i++) {
					slots+= "?, ";
				};
				slots += "?)";
				var querry ="SELECT * FROM items WHERE i_id in("+slots;
					// console.log(querry);
				db.all(querry, ids, callback);
			}
		],cb);
	},
	getAll: function(type, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.all("SELECT * FROM items", callback);
			}
		],cb);
	},
});

exports.Items = new Items();