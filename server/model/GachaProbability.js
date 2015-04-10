var Backbone        = require('backbone');
var async 			= require('async');
var SQLiteSingleton	= require('./SQLiteSingleton').SQLiteSingleton;

var GachaProbability = Backbone.Model.extend({
	
	initialize: function () {
		// body...
	},
	getItemsByType: function(type, cb){
		async.waterfall ([
			function (callback){
				callback(null, SQLiteSingleton);
			},
			function (db, callback){
				db.all("SELECT * FROM gacha_probability WHERE g_id=?", type callback);
			}
		],cb);
	},
});

exports.GachaProbability = new GachaProbability();