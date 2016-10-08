//Create a module and create a controller for angular
var myangularapp = angular.module("myangularapp", []);
myangularapp.controller("myangularController", function($scope,$http) {    
        
    $scope.login = function (){
     alert('test3');
    
        $scope.username1;
        $scope.password1;
        
        $http.post('/login', { username: $scope.username1,
       password: $scope.password1,
             }).then(function(response) {
        alert('hi i am working');
        //alert(JSON.stringify(response));
        alert(response.data[0].status);
            if(response.data[0].status == 1){
                //window.location.href = 'http://joelwebsites.com';
                console.log("Login Successful");
            }
            
    }, function errorCallback(response) {
            alert('error');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
    }
    
});

function login(){
        //login code here
    var username = $('#username1').val();
    var password = $('#password1').val();
            
    alert(username+'hi i am the username login');
        alert(password+'hi i am the password login');
            
        alert('login function is called!');
       var url = 'http://localhost/login/public/login.js?username='+username+'&password='+password;
            
            alert(url);
            console.log(url);
            $.post(url,
    function(data, status){
                
                alert(JSON.stringify(data));
                var status = data[0].status;
                
                if(status == 1){
                    //this is the sucess code
                    window.location.href = '#';
                }
                
                if(status != 1){
                    alert('login failed');
                }
                alert(status+'i am the status test');
        alert("Data: " + data + "\nStatus: " + status);
    });
        
        }
        function register(){
    var email = $('#email').val();
    var username = $('#username').val();
    var confirmpassword =$('#confirm-password').val();
      
            
            $.post("http://localhost/public/register.html",
    {
        password: confirmpassword,
        email: email,
        username: username
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
        }