var Backbone        = require('backbone');
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
				db.all("SELECT * FROM items WHERE rare=?", type+1, callback);
			}
		],cb);
	},
});

exports.Items = new Items();