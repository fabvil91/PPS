(function () {
    'use strict';
 
    angular
        .module('app')
     //   .controller('loginCtrl', ['$location', 'AuthenticationService', 'FlashService',function($location, AuthenticationService, FlashService) {
          .controller('loginCtrl', ['$location',function($location) { 
 
        $scope.login = {};
 		$scope.dataLoading = {};
    /*    (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();*/
 
        function login() {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.login.username, $scope.login.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.login.username, $scope.login.password);
                    $location.path('/main');
                } else {
                    FlashService.Error(response.message);
                    $scope.dataLoading = false;
                }
            };
        )};
    }]) 
}();