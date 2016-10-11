//Create a module and create a controller for angular
console.log('in controller 1');

var myangularapp = angular.module("myangularapp", []);
myangularapp.controller("myangularController", function($scope, $http, $window) {
    console.log('in controller 2');
    $scope.register = function() {
        alert('In Register');
        $http.post("/register", {
                password: $scope.newUser.password,
                email: $scope.newUser.email,
                username: $scope.newUser.username
        }).then(function(response) {
            alert('Thanks for registering');
            $window.location = '/';
        });      
    };

    $scope.login = function() {
        

        $scope.username1;
        $scope.password1;

        $http.post('/login', {
            username: $scope.username1,
            password: $scope.password1,
        }).then(function(response) {            
            console.log("Login Successful");
            $window.location = '/';

        }, function errorCallback(response) {
            alert('Password Incorrect or User not found.');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

});
