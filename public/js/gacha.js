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

var app = angular.module('myApp', ['ngRoute', 'socket-io']);
app.controller('customersCtrl', function ($scope, socket) {
    $scope.logedin = false;
    socket.on("showItems", function (data){
        console.log(JSON.stringify(data));
        $scope.items = data;
    });
    socket.on("loginSuccess",function (data){
        console.log(data);
        if(data) {
            $scope.logedin = data.logedin;
            $scope.coins = data.coins;
            $scope.user = data.email;
            $scope.items = data.items;
        }

    });
});