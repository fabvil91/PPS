(function(){
	'use strict';
	angular.module('cine')
	.controller('finalizarOperacionCtrl', ['$rootScope','$scope','Datos',function($rootScope,$scope,Datos){		
		$scope.funcion = Datos.listado();					
	}]);
})();