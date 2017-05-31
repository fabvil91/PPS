(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope', '$window','Usuarios', 
	function($scope,Datos,$rootScope,$window,Usuarios){		
		$scope.funcion = Datos.listado();			
		
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

			var usuario = null;
			Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
              .then(function (userArray) {
			  var user = userArray[0];
			  console.log(user);
              if (user) {
                  usuario = user;
              }

			var entradas = [];
			for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
				if($scope.funcion.entradas[i].cantidad > 0){
					entradas.push($scope.funcion.entradas[i]);
				}
			}

			var promo = null;
            for (var i = entradas.length - 1; i >= 0; i--) {
                if(entradas[i].promocion){
                   promo = entradas[i].promocion;
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
            if($scope.funcion.transaccion.tipoTransaccion == 'compra'){
				operacion = {
				codigo: $scope.funcion.transaccion.codigo,
				estado: "Pagado",
				funcion: $scope.funcion,
				entradas: entradas,
				tipoPago: "Credito",
				nombreTitular: $scope.funcion.operacion.titular,
				dniTitular: $scope.funcion.operacion.dni,
				nroTarjeta: $scope.funcion.operacion.nroTarjeta,
				codigoSeguridad: $scope.funcion.operacion.codigoSeguridad,
				fechaVencimiento: $scope.funcion.operacion.vencimiento,
				tarjeta: $scope.funcion.operacion.tarjeta,
				banco: $scope.funcion.operacion.banco,
				fechaOperacion: new Date(),
				usuario: usuario,
				promocion: promo }
			}else{
				operacion = {
				codigo: $scope.funcion.transaccion.codigo,
				estado: "Reservado",
				funcion: $scope.funcion,
				entradas: entradas,
				tipoPago: null,
				nombreTitular: null,
				dniTitular: null,
				nroTarjeta: null,
				codigoSeguridad: null,
				fechaVencimiento: null,
				tarjeta: null,
				banco: null,
				fechaOperacion: new Date(),
				usuario: usuario,
				promocion: promo }
			}
			console.log(operacion);                                  
		});                          
        	
		}
	}])
})();

