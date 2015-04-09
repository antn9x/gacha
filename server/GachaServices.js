var Backbone        = require('backbone');
var async           = require('async');
var Items        	= require('./model/Items').Items;

var GachaServices = Backbone.Model.extend({
    initialize : function () {
        // body...
		console.log("gache");
    },
	getItemsByType : function (type, cb) {
		Items.getItemsByType(type, cb);
	}
});

exports.GachaServices = new GachaServices();