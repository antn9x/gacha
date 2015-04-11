var Backbone        = require('backbone');
var _        		= require('underscore');
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
	drawGacha : function (email, type, cb) {
		var _self = this;
		async.auto({
			gachaProbability: function (next) {
				GachaProbability.getItemsByType(type, next);
			},
			items: ['gachaProbability', function (next, res) {
				var rare = _self._getRandomItemRare(res.gachaProbability);
				Items.getItemsByType(rare, next);
			}],
			draw: ['items', function (next, res) {
				var items = res.items
				var r = _.random(0, items.length);
				next(null, items[r]);
			}],
			updateItems: ['draw', function (next, res) {
				var item = res.draw;
				console.log(JSON.stringify(item));
				UserItem.addItem(email, item, next);
			}],
			current: function (next) {
				UserItem.getItemsByEmail(email, next);
			},
			itemsInfo: ['current', 'draw', function (next, res) {
				var ids = _.pluck(res.current, "i_id");
				ids.push(res.draw.i_id);
				Items.getItemsByIds(ids, next);
			}],
		}, function (err, res) {
			// console.log(JSON.stringify(res.current));
			// console.log("items: "+JSON.stringify(res.itemsInfo));
			var items = [];
			_.each(res.current, function (c){
				var itemInfo = _.find(res.itemsInfo, function (i){
					return i.i_id === c.i_id;
				});
				_.extend(c,itemInfo);
				items.push(_.pick(c,'i_id','i_name','quantity'));
			});
			cb(null, items);
		});
	},
	_getRandomItemRare: function (gachaProbability) {
        var rand_list = _.pluck(gachaProbability, "probability");
        var totalProb = 0;
        _.each(rand_list, function (p){
            totalProb += p;
        });
        var rand_index = Math.floor(Math.random() * totalProb);
        var startIndex = 0;
        var stop_index = gachaProbability.length - 1;

        for (var i = 0; i < rand_list.length; i++) {
            if (startIndex <= rand_index && rand_index < (startIndex + rand_list[i])) {
                stop_index = i;
                break;
            }
            startIndex += rand_list[i];
        };
        return gachaProbability[stop_index].rare;
	}
});

exports.GachaServices = new GachaServices();