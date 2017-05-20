(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope',
	function($scope,Datos,$rootScope){		
		$scope.funcion = Datos.listado();					
	}])
})();

