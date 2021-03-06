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
    },
	getItemsByType : function (type, cb) {
		Items.getItemsByType(type, cb);
	},
	checkLogin : function (data, cb) {
		if(data.type == 0){
			this._checkLogIn(data,cb);
		}
		else
		Users.addNewUser(data, cb);
	},
	drawGacha : function (email, type, cb) {
		var _self = this;
		var newMoney;
		async.auto({
			updateCoins: function (next) {
				Users.updateCoins({email:email}, next);
			},
			spendMoney: ['updateCoins', function (next, res) {
				var coins = res.updateCoins;
				var consumption = (type == 0) ? 100 : ((type ==1)? 1000: 500);
				newMoney = coins - consumption;
				console.log(newMoney);
				if(newMoney<0){
					cb(new Error("Do not enough money"));
					return;
				}
				Users.spendMoney({coins: newMoney, email:email}, next);
			}],
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
			// console.log(JSON.stringify(res.itemsInfo));
			var items = _self._getItemUserInfo(res.current, res.itemsInfo);
			var ret = {items:items, user:{coins:newMoney}};
			cb(null, ret);
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
	},
	_checkLogIn: function (data, cb) {
		var _self = this;
		async.auto({
			user: function (next) {
				Users.checkLogin(data, next);
			},
			items: ['user', function (next, res) {
				var user = res.user;
				UserItem.getItemsByEmail(user.email, next);
			}],
			itemsInfo: ['items', function (next, res) {
				var ids = _.pluck(res.items, "i_id");
				Items.getItemsByIds(ids, next);
			}],
			updateCoins: function (next) {
				Users.updateCoins(data, next);
			}
		}, function (err, res) {
			console.log(res.updateCoins);
			var ret = res.user ? {
				email: res.user.email,
				coins: res.updateCoins,
				logedin: true,
				items: _self._getItemUserInfo(res.items, res.itemsInfo)
			} : {logedin: false};
			cb(null, ret);
		});
	},
	_getItemUserInfo: function (current, itemsInfo) {
		var items = [];
		_.each(current, function (c){
			var itemInfo = _.find(itemsInfo, function (i){
				return i.i_id === c.i_id;
			});
			_.extend(c,itemInfo);
			items.push(_.pick(c,'i_id','i_name', 'rare', 'quantity'));
		});
		return items;
	}
});

exports.GachaServices = new GachaServices();