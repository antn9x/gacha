var Backbone        = require('backbone');
var async           = require('async');
var GachaServices   = require('./GachaServices').GachaServices;

var GachaServer  = Backbone.Model.extend({
    _server : null,
    result : 44,
    initialize : function () {
        // body...
        _server = this;
        _email = "";
    },
    onSocketConnection : function (client) {
        console.log("New player has connected: " + client.id);
        // Listen for client disconnected
        client.on("disconnect", _server.onClientDisconnect);
        //business
        client.on("onLogin",_server.onLogin);
        client.on("onLogout",_server.onLogout);
        client.on("onDraw", _server.onDraw);
    },
    onClientDisconnect: function() {
        console.log("Player has disconnected: " + this.id);
    },
    onLogin: function (data) {
        console.log(data);
        var _sefl = this;
        GachaServices.checkLogin(data, function (err, res) {
            if (err) {console.log(err)};
            res.logedin = true;
            _email = data.email;
            _sefl.emit("loginSuccess", res);
            if(res) {
                _sefl.emit("showItems", res.items);
            }
        });
    },
    onLogout: function (data) {
        console.log(data);
        var _sefl = this;
            _sefl.emit("loginSuccess", {logedin:false});
    },
    onDraw: function (data) {
        console.log("CLIENT DRAW: "+JSON.stringify(data));
        var _sefl = this;
        GachaServices.drawGacha(_email, data.type, function (err, items) {
            _sefl.emit("showItems", items);
        });
    }
});

exports.GachaServer = new GachaServer();