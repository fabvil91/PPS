(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope', '$window','Usuarios','Operaciones','Funciones','Constantes','Mail', 
	function($scope,Datos,$rootScope,$window,Usuarios,Operaciones,Funciones,Constantes,Mail){		
		$scope.funcion = Datos.listado();			
		
		$scope.imprimir=function(){
			$window.print();
		};
		
		$scope.formatearHora = function(funcion){
		
			var fecha = new Date(funcion.hora);
			
			return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
		}
		$scope.formatearHoraMail = function(funcion){ 
			var diff=30;        	       	
			var fecha = new Date(funcion.hora);
			fecha = new Date(fecha.getTime() + diff*60000);
			
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

				   Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
				.then(function(datos){
					$scope.usuario=datos[0];
				    //descuento de cuenta corriente MOVER A FINALIZAR OPERACION
					console.log(funcion.descuentoCuentaCorriente);
					console.log($scope.usuario.cuentaCorriente);
					console.log(funcion.precioTotal);
					if($scope.funcion.descuentoCuentaCorriente==true){

						if($scope.usuario.cuentaCorriente<= $scope.funcion.precioTotal){
							$scope.funcion.precioTotal= $scope.funcion.precioTotal-$scope.usuario.cuentaCorriente;
							$scope.usuario.cuentaCorriente=0;
							Usuarios.modificarCuentaCorriente($scope.usuario)
							.then(function(datos){
								console.log(datos);
								})
								.catch(function(e){
								console.log(e);
							})

						}else{
							
							$scope.usuario.cuentaCorriente=$scope.usuario.cuentaCorriente- $scope.funcion.precioTotal;
							$scope.funcion.precioTotal=0;
							Usuarios.modificarCuentaCorriente($scope.usuario)
							.then(function(datos){
								console.log(datos);
								})
								.catch(function(e){
								console.log(e);
							})
						}
					} 
					})
								.catch(function(e){
								console.log(e);
							})

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
			   //manda Mail
			    var item = {};
                   item.usuario=user;
                   item.operacion=operacion;
				   item.hora=$scope.formatearHoraMail(operacion.funcion);
			
			if(operacion.funcion.transaccion.tipoTransaccion=="reserva"){
				Constantes.listado()
				.then(function(datos){
		        console.log(datos);
					item.porcentajeListaNegra=datos[0].porcentajeListaNegra;
					console.log("!!!!!!!ITEM!!!!!!!!!!!!!");
                    console.log(item);
					Mail.enviarReserva(item);

		         })
		       .catch(function(e){
		        console.log(e);
		       }); 
                    
			}
			if(operacion.funcion.transaccion.tipoTransaccion=="compra"){
				console.log("!!!!!!!ITEM!!!!!!!!!!!!!");
                console.log(item);
				Mail.enviarCompra(item); 
			}
	       })
	       .catch(function(e){
	        console.log(e);
	       }); 
	                                       
		});                          
        	
		}
	}])
})();

