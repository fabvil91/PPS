(function(){
	'use strict';
	angular.module('cine')
	.controller('salasCtrl', ['$rootScope','$scope','Datos','$sce','Salas','$timeout',function($rootScope,$scope,Datos,$sce,Salas,$timeout){	
			 $scope.funcion = Datos.listado();
			 $scope.funcion.sala = Salas.crear(10,10);
			            	
	         var _startCountdown = function(){
				var timerCount = 3660;

				var countDown = function () {
				 if (timerCount < 0) {					 
					console.log("SE TERMINO EL TIEMPO");
				 } else {
					$scope.countDownLeft = timerCount;
					timerCount--;
					$timeout(countDown, 1000);
				  }
				 };
				$scope.countDownLeft = timerCount;
				countDown();
			 }
	        
	         _startCountdown();

	         $scope.seleccionar = function(asiento){
	         	if(asiento.booked == false){	         		
	         		asiento.checked = !asiento.checked;	
	         		console.log(asiento);
	         	}
	         	
	         }
    }])
})();