var Backbone        = require('backbone');
var async           = require('async');
var GachaServices    = require('./GachaServices').GachaServices;

var GachaServer  = Backbone.Model.extend({
    _server : null,
    result : 44,
    initialize : function () {
        // body...
        _server = this;
    },
    onSocketConnection : function (client) {
        console.log("New player has connected: " + client.id);
        // Listen for client disconnected
        client.on("disconnect", _server.onClientDisconnect);
        //business
        client.on("onLogin",_server.onLogin);
        client.on("onDraw", _server.onDraw);
    },
    onClientDisconnect: function() {
        console.log("Player has disconnected: " + this.id);
    },
    onLogin: function (data) {
        console.log(data);
        var _sefl = this;
        _sefl.emit("loginSuccess", {success:1});
    },
    onDraw: function (data) {
        console.log(data);
        var _sefl = this;
        _sefl.emit("finishDraw", {items:[]});
        GachaServices.getItemsByType(data.type, function (err, items) {
            _sefl.emit("showItems", items);
        });
    }
});

exports.GachaServer = new GachaServer();