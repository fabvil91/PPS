(function(){
	'use strict';
	angular.module('cine')
	.controller('cajeroAsientosCtrl', ['$rootScope','$scope','Datos','$sce','Salas','$timeout','$location',function($rootScope,$scope,Datos,$sce,Salas,$timeout,$location){
			 $scope.mensaje = "";			
			 $scope.funcion = Datos.listado();			 
			            	
	         var _startCountdown = function(){
				var timerCount = 300;

				var countDown = function () {
				 if (timerCount < 0) {					 
					$location.path('/main');
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

	         $scope.contarSeleccionados = function(){
	         	var cantidadSeleccionada = 0;
	         	 for (var i = $scope.funcion.sala.length - 1; i >= 0; i--) {
	         	 	for (var j = $scope.funcion.sala[i].length - 1; j >= 0; j--) {
	         	 		if($scope.funcion.sala[i][j].checked == true){
	         	 			cantidadSeleccionada = cantidadSeleccionada + 1;
	         	 		}
	         	 	}
	         	 }
	         	 return cantidadSeleccionada;
	         }

	         $scope.seleccionar = function(asiento){
	         	if(asiento.booked == false){	         			         		
	         			asiento.checked = !asiento.checked;	         			
	         		}	         	
	         }
	       
	         $scope.cargar = function(funcion){                
        	   console.log(funcion);        	
			   Datos.cargar(funcion);

			   if($scope.funcion.transaccion.tipoTransaccion == 'compra'){
			   		$location.path('/datosOperacionCompra');
			   }else if($scope.funcion.transaccion.tipoTransaccion == 'reserva'){
			   		$location.path('/finalizarOperacion');
			   }			   
        	 }

        	 $scope.formatearHora = function(funcion){        	
			     var fecha = new Date(funcion.hora);
			     return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
			 }	       		         	         
    }])
})();