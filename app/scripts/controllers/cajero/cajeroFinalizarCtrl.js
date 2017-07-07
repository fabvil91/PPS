(function(){
	'use strict';
	angular
	.module('cine')
	.controller('cajeroFinalizarCtrl', ['$scope','Datos', '$rootScope', '$window','Usuarios','Operaciones','Funciones', 
	function($scope,Datos,$rootScope,$window,Usuarios,Operaciones,Funciones){		
		$scope.funcion = Datos.listado();

		$scope.formatearEntrada = function(entrada){                          
			return entrada.tipo + " - " + entrada.monto + " - " + entrada.cantidad;
		}

		$scope.total = function(){  
				var total = 0;                        
				for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
					total = total + $scope.funcion.entradas[i].subtotal;
				}
				return total;
		}		
		
		$scope.imprimir=function(){
			$window.print();
		};
		
		$scope.formatearHora = function(funcion){        	
			var fecha = new Date(funcion.hora);
			return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
		}

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

		$scope.registrarOperacion = function(){
			console.log($scope.funcion);
					
			var promo = null;
            for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                if($scope.funcion.entradas[i].promocion){
                   promo = $scope.funcion.entradas[i].promocion;
                   break;
                }
            }

            if(promo){ 
            	console.log("promo del dia");
            	promo = promo;
            }else{
            	if($scope.funcion.operacion && $scope.funcion.operacion.promociones){
            		console.log("promo de tarjeta/Banco");
            		promo = $scope.funcion.operacion.promociones;
            	}else{
            		console.log("sin promos");
            		promo = null;
            	}
            }

            var operacion = {};
            if($scope.funcion.operacion.tipoPago =='debito' || $scope.funcion.operacion.tipoPago=='credito'){
				operacion = {
				codigo: $scope.funcion.transaccion.codigo,
				estado: "Retirado",
				funcion: $scope.funcion,
				entradas: $scope.funcion.entradas,
				tipoPago: $scope.funcion.operacion.tipoPago == 'credito' ? 'Credito' : 'Debito',
				nombreTitular: $scope.funcion.operacion.titular,
				dniTitular: $scope.funcion.operacion.dni,
				nroTarjeta: $scope.funcion.operacion.nroTarjeta,
				codigoSeguridad: $scope.funcion.operacion.codigoSeguridad,
				fechaVencimiento: $scope.funcion.operacion.vencimiento,
				tarjeta: $scope.funcion.operacion.tarjeta,
				banco: $scope.funcion.operacion.banco,
				fechaOperacion: new Date(),
				usuario: null,
				promocion: promo }
			}else if($scope.funcion.operacion.tipoPago =='efectivo'){
				operacion = {
				codigo: $scope.funcion.transaccion.codigo,
				estado: "Retirado",
				funcion: $scope.funcion,
				entradas: $scope.funcion.entradas,
				tipoPago: 'Efectivo',
				nombreTitular: null,
				dniTitular: null,
				nroTarjeta: null,
				codigoSeguridad: null,
				fechaVencimiento: null,
				tarjeta: null,
				banco: null,
				fechaOperacion: new Date(),
				usuario: null,
				promocion: promo }
			}
			console.log(operacion); 

			Operaciones.alta(operacion)
	       .then(function(datos){
	        console.log(datos);

	         for (var i = $scope.funcion.sala.asientos.length - 1; i >= 0; i--) {
	         	 	for (var j = $scope.funcion.sala.asientos[i].length - 1; j >= 0; j--) {
	         	 		if($scope.funcion.sala.asientos[i][j].checked == true){
	         	 			$scope.funcion.sala.asientos[i][j].booked = true;
	         	 			$scope.funcion.sala.asientos[i][j].checked = false;
	         	 		}
	         	 	}
	         	 }
	         console.log($scope.funcion.sala);	 

	         	Funciones.modificarSala({
	         		_id: $scope.funcion._id,
	         		sala: $scope.funcion.sala
	         	})
		       .then(function(datos){
		        console.log(datos);
		         })
		       .catch(function(e){
		        console.log(e);
		       }); 

	       })
	       .catch(function(e){
	        console.log(e);
	       }); 	                                       		                                  	
		}
	}])
})();