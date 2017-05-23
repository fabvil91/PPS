(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope', '$window', 
	function($scope,Datos,$rootScope,$window){		
		$scope.funcion = Datos.listado();			
		
		$scope.imprimir=function(){
			$window.print();
		};
		
		$scope.confirm = function () {   
			$("#confirmarPop").on('hidden.bs.modal', function () {
				$location.path("/");
				$scope.$apply();
			});
		};
		

		$scope.generarCodigo= function(){
			var length = 6;
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for(var i = 0; i < length; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			$scope.funcion.transaccion.codigo = text;
			console.log($scope.funcion.transaccion.codigo);
		}();

			
	}])
})();

