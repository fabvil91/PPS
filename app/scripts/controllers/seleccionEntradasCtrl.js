(function(){
	'use strict';
	angular.module('cine')
	.controller('seleccionEntradasCtrl', ['$rootScope','$scope','Datos','$sce','Precios','Promociones','Usuarios',function($rootScope,$scope,Datos,$sce,Precios,Promociones,Usuarios){							
		$scope.filtro = {};	 	
	
		 Precios.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.precios = datos;

	         Promociones.listado()
		     .then(function(datos){
		     	console.log(datos);
		        $scope.promociones = datos;
					Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                    .then(function(datos){
                    $scope.usuario=datos[0]; 
                    console.log($scope.usuario);
                        Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                        .then(function(datos){ 
                            $scope.usuario=datos[0]; 
                            console.log("actual user:");
                            console.log($scope.usuario);
							$scope.transaccion = {}
							$scope.entradas = [];
							$scope.total = 0;
							$scope.cantidadTotal = 0;
							$scope.hideCuenta=false;
							$scope.descuento=false;

							$scope.funcion = Datos.listado();

							$scope.preciosFiltrados = $scope.precios.filter(function(element){
									return (element.complejo.nombre === $scope.funcion.complejo.nombre && element.formato.nombre === $scope.funcion.formato.nombre);
							});

							(function(){
								var promocion = null;
								for (var i = $scope.promociones.length - 1; i >= 0; i--) {
									if ($scope.promociones[i].diaSemana == new Date($scope.funcion.dia).getDay()){
										promocion = $scope.promociones[i];
										break;
									}
								}
								console.log(promocion);
								for (var i = $scope.preciosFiltrados.length - 1; i >= 0; i--) {
									$scope.preciosFiltrados[i].cantidad = 0;
									$scope.preciosFiltrados[i].subtotal = 0;

									if($scope.preciosFiltrados[i].tipo == 'Entrada General' && promocion != null){
										$scope.preciosFiltrados[i].tipoOriginal = 'Entrada General';
										$scope.preciosFiltrados[i].tipo = promocion.nombre;

										$scope.preciosFiltrados[i].montoOriginal = $scope.preciosFiltrados[i].monto;
										$scope.preciosFiltrados[i].monto = $scope.preciosFiltrados[i].monto * (promocion.porcentaje / 100);

										$scope.preciosFiltrados[i].promocion = promocion;
									}
								}
								console.log($scope.preciosFiltrados);
							})();

							$scope.formatearHora = function(funcion){        	
								var fecha = new Date(funcion.hora);
								return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
							}
							$scope.usarCuenta=function(){								
									$scope.descuento=true;	
									$scope.hideCuenta=true;
							}
							$scope.noUsarCuenta=function(){								
									$scope.descuento=false;	
									$scope.hideCuenta=true;
							}
			     })
		     .catch(function(e){
		       console.log(e);
		     })
	     })
	     .catch(function(e){
	       console.log(e);
	     })
		 })
		     .catch(function(e){
		       console.log(e);
		     })
			 })
		     .catch(function(e){
		       console.log(e);
		     })
		
		$scope.agregarEntrada = function(precio){	
			if($scope.cantidadTotal == 6){		
				$scope.mensaje = "Puede seleccionar un máximo de 6 entradas"
			}else{	
				precio.cantidad = precio.cantidad + 1;
				precio.subtotal = precio.cantidad * precio.monto;
				$scope.total = $scope.total + precio.monto;				
				$scope.cantidadTotal = $scope.cantidadTotal + 1;
			}							
		};

		$scope.restarEntrada = function(precio){				
			if(precio.cantidad > 0){
				precio.cantidad = precio.cantidad - 1;
				precio.subtotal = precio.cantidad * precio.monto;
				$scope.total = $scope.total - precio.monto;			
				$scope.cantidadTotal = $scope.cantidadTotal - 1;
			}
		}

		//Tiene que hacer los cambios en FinalizarOperacion pero no se donde. Preguntar.

		$scope.calcularDescuento=function(funcion){
			var precio=0;

			funcion.entradas.forEach((item)=>{
				precio=precio+item.subtotal;				
			});

			if($scope.usuario.cuentaCorriente<=precio){
				precio=precio-$scope.usuario.cuentaCorriente;
				$scope.usuario.cuentaCorriente=0;
				Usuarios.modificarCuentaCorriente($scope.usuario);
				console.log($scope.usuario.cuentaCorriente);
			}else{
				
				$scope.usuario.cuentaCorriente=$scope.usuario.cuentaCorriente-precio;
				precio=0;
				Usuarios.modificarCuentaCorriente($scope.usuario);
				
				console.log($scope.usuario.cuentaCorriente);
			}
			return precio;
		}

		$scope.cargar = function(funcion){
			
        	funcion.cantidadAsientos = $scope.cantidadTotal;
        	funcion.entradas = $scope.preciosFiltrados;
        	funcion.transaccion = $scope.transaccion;
			console.log($scope.usuario);
			if($scope.descuento==true){
				funcion.precioTotal=$scope.calcularDescuento(funcion);
			}
        	console.log(funcion);
        	console.log($scope.usuario);
			Datos.cargar(funcion);
        }					
    }])
})();


