(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('registroCtrl', ['$scope','$location','UserService','$rootScope',
        function ($scope,$location,UserService,$rootScope) {
        
        // $scope.dataLoading = {};
         $scope.registroForm = {
         	firstName: null,
         	lastName: null,
         	username: null,
         	password: null
         };
         $scope.mensaje = null;

               
		$scope.registrar = function() {
//            vm.dataLoading = true;
            UserService.Create($scope.registroForm)
                .then(function (response) {
                    if (response.success) {
                       // FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
 						console.log("error");
	                    $scope.mensaje = response.message;                       
// FlashService.Error(response.message);
                     //   vm.dataLoading = false;
                    }
                });
        };   
}]);
}) ();

