(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope', '$window',
	function($scope,Datos,$rootScope,$window){		
		$scope.funcion = Datos.listado();			
		
		$scope.imprimir=function(){
			$window.print();
		}
	}])
})();

