(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('loginCtrl', ['$rootScope','$scope','$location', 'AuthenticationService',
        function ($rootScope,$scope,$location, AuthenticationService) {
                
         $scope.loginForm = {};
         $scope.mensaje = null;

        (function () {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        $scope.login = function login() {        
            AuthenticationService.Login($scope.loginForm.username, $scope.loginForm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.loginForm.username, $scope.loginForm.password);
 					console.log($rootScope);
                    $location.path('/main');


                $rootScope.$emit('myOwnEvent', $scope.loginForm.username);

                } else {
                    console.log("error");
                    $scope.mensaje = response.message;             
                }
            });
        }; 
		 
}]);
}) ();