(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('loginCtrl', ['$scope','$location', 'AuthenticationService',
        function ($scope,$location, AuthenticationService) {
        
        // $scope.dataLoading = {};
         $scope.loginForm = {};
         $scope.mensaje = null;

        (function () {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();
 
        $scope.login = function login() {
        //    $scope.dataLoading = true;
            AuthenticationService.Login($scope.login.username, $scope.loginForm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.loginForm.username, $scope.loginForm.password);
                    $location.path('/main');
                } else {
                    console.log("error");
                    $scope.mensaje = response.message;
             //       $scope.dataLoading = false;
                }
            });
        };     
}]);
}) ();