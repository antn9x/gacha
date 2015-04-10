var Backbone        = require('backbone');
var async           = require('async');
var Items        	= require('./model/Items').Items;
var Users        	= require('./model/Users').Users;
var GachaProbability= require('./model/GachaProbability').GachaProbability;
var UserItem		= require('./model/UserItem').UserItem;

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
	drawGacha : function (type, cb) {
		async.auto({
			current: function (next) {
				next();
			},
			gachaProbability: function (next) {
				GachaProbability.getItemsByType(type, next);
			},
			items: function (next) {
				Items.getItemsByType(type, next);
			}
		}, function (err, res) {
			var items =[];
			items = res.items;
			cb(null, items)
		});
	}
});

exports.GachaServices = new GachaServices();