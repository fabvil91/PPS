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
							$scope.promocion={};

							$scope.funcion = Datos.listado();
							//trae entradas+precio que concida con el complejo y formato de funcion
							$scope.preciosFiltrados = $scope.precios.filter(function(element){
									return (element.complejo.nombre === $scope.funcion.complejo.nombre && element.formato.nombre === $scope.funcion.formato.nombre);
							});

							(function(){
								//carga solo la primera promocion que sea del dia actual
								var promocion = null;
								for (var i = $scope.promociones.length - 1; i >= 0; i--) {
									if ($scope.promociones[i].diaSemana == new Date($scope.funcion.dia).getDay()){
										promocion = $scope.promociones[i];
										break;
									}
								}
								console.log(promocion);
								$scope.promocion = promocion;
								for (var i = $scope.preciosFiltrados.length - 1; i >= 0; i--) {
									$scope.preciosFiltrados[i].cantidad = 0;
									$scope.preciosFiltrados[i].subtotal = 0;

									if(promocion != null && ($scope.preciosFiltrados[i].tipo == promocion.tipoEntrada || promocion.tipoEntrada=="Todas")){
										
										if(promocion.tipoDescuento=="Porcentaje"){
											$scope.preciosFiltrados[i].descuento = $scope.preciosFiltrados[i].monto * (promocion.porcentaje / 100);
											$scope.preciosFiltrados[i].monto=$scope.preciosFiltrados[i].monto-$scope.preciosFiltrados[i].descuento;
										}

										
									}
								}
								console.log("Precios Filtrados");
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
			
			//descuento 2x1
			//se fija si hay promocion 2x1
			if(funcion.promocion!=null&&funcion.promocion.tipoDescuento=="2x1"){
				
				funcion.entradas.forEach(function(element) {
					//se fija si se aplica al tipo de entrada, hace 2X1 en entradas del mismo tipo
					if(element.tipo==funcion.promocion.tipoEntrada||funcion.promocion.tipoEntrada=="Todas"){
						if(element.cantidad!=1){
							if(element.cantidad%2==0){
								console.log("PAR");
								element.subtotal=element.subtotal/2;
							}else{
								console.log("Impar");
								//saca el precio de una entrada
								element.subtotal=element.subtotal-element.monto;
								//divide el nuevo precio por dos y despues le agrega el precio de la entrada extra
								element.subtotal=(element.subtotal/2)+element.monto;
							}
						}
					}
				});
				$scope.total=0;
				funcion.entradas.forEach(function(element) {
					$scope.total=$scope.total+element.subtotal;
				});
			}

			var precio=$scope.total;
			
			
			return precio;
		}


		$scope.cargar = function(funcion){
			
        	funcion.cantidadAsientos = $scope.cantidadTotal;
        	funcion.entradas = $scope.preciosFiltrados;
        	funcion.transaccion = $scope.transaccion;
			funcion.precioTotal=$scope.total;
			if($scope.promocion!=null){
				funcion.promocion=$scope.promocion;				
			}
			console.log($scope.usuario);
			
				funcion.precioTotal=$scope.calcularDescuento(funcion);
				funcion.descuentoCuentaCorriente=$scope.descuento;
			
        	console.log(funcion);
			Datos.cargar(funcion);
        }					
    }])
})();


