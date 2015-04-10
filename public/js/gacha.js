var socket = io.connect('http://localhost:3000');

socket.on("finishDraw",function(data){
    console.log(data);
});

function login (type) {
    // body...
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    socket.emit("onLogin", {email:email, password:password, type:type});
}
function logout () {
    socket.emit("onLogout", {email:email});
}
function nomal () {
    // body...
    socket.emit("onDraw",{type:0});
    // alert("nomal");
}
function expensive () {
    // body...
    socket.emit("onDraw",{type:1});
    // alert("expensive");
}
function box () {
    // body...
    socket.emit("onDraw",{type:2});
    // alert("box");
}

var app = angular.module('myApp', ['ngRoute', 'socket-io']);
app.controller('customersCtrl', function ($scope, socket) {
    $scope.logedin = false;
    socket.on("showItems", function (data){
        console.log(JSON.stringify(data));
        $scope.names = data;
    });
    socket.on("loginSuccess",function (data){
        console.log(data);
        if(data) {
            $scope.logedin = data.logedin;
            $scope.coins = data.coins;
            $scope.user = data.email;
        }

    });
});