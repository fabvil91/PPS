(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('contactanosCtrl', ['$scope','$location','Mail','$rootScope',
        function ($scope,$location,Mail,$rootScope) {
                
         $scope.contactanosForm = {
         	firstName: null,
         	lastName: null,
         	email: null,
            complejo: null,
            asunto: null,
            mensaje: null
         };
         
		$scope.enviar = function(){
		Mail.enviar($scope.contactanosForm)
		.then(function(datos){
		      console.log(datos);
		})
		.catch(function(e){
		      console.log(e);
		}); 
		}
		           		
     }]);
})();

