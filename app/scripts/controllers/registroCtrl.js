(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('registroCtrl', ['$scope','$location','UserService','$rootScope',
        function ($scope,$location,UserService,$rootScope) {
                
         $scope.registroForm = {
         	firstName: null,
         	lastName: null,
         	username: null,
         	password: null
         };
         $scope.mensaje = null;

               
		$scope.registrar = function() {
            UserService.Create($scope.registroForm)
                .then(function (response) {
                    if (response.success) {
                        $location.path('/login');
                    } else {
 						console.log("error");
	                    $scope.mensaje = response.message;                       
                    }
                });
        };   
}]);
}) ();

