var socket = io.connect('http://localhost:3000');

function login (type) {
    // body...
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    socket.emit("onLogin", {email:email, password:password, type:type});
}
function logout () {
    socket.emit("onLogout", {email:email});
}
function draw (type) {
    socket.emit("onDraw",{type:type});
}
function convertRareToString (items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        switch (item.rare){
            case 0: item.rare = "Common"; break;
            case 1: item.rare = "UnCommon"; break;
            case 2: item.rare = "Rare"; break;
            case 3: item.rare = "Supper Rare"; break;
            default: item.rare = "Common";
        }
    };
    return items;
}
var app = angular.module('myApp', ['ngRoute', 'socket-io']);
app.controller('customersCtrl', function ($scope, socket) {
    $scope.logedin = false;
    socket.on("showItems", function (data){
        console.log(JSON.stringify(data));
        $scope.items = convertRareToString(data);
    });
    socket.on("loginSuccess",function (data){
        console.log(data);
        if(data) {
            $scope.logedin = data.logedin;
            $scope.coins = data.coins;
            $scope.user = data.email;
            $scope.items = convertRareToString(data.items);
        }

    });
});