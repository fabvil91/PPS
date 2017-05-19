(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('contactanosCtrl', ['$scope','$location','UserService','$rootScope',
        function ($scope,$location,UserService,$rootScope) {
                
         $scope.contactanosForm = {
         	firstName: null,
         	lastName: null,
         	Email: null,
            Complejo: null,
            Asunto: null,
            Mensaje: null
         };
         $scope.mensaje = null;
               		
        }]);
})();

