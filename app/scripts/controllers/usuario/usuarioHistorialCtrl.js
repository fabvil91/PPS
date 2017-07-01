(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioHistorialCtrl', ['$rootScope','$scope','Usuarios','Operaciones','Datos','$window',function($rootScope,$scope,Usuarios,Operaciones,Datos,$window){	
       $scope.reloadPage = function(){$window.location.reload();}

        Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
        .then(function(datos){ 
            $scope.usuario=datos[0]; 
            console.log("root user:");
            console.log($scope.usuario);

            $scope.ifRetirada=false;
            $scope.ifNoRetirada=false;
            $scope.ifReserva=false;
            $scope.ifCompra=false;
            $scope.ifFechas=false;
            $scope.fechas = [];


             Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
              .then(function(datos){ 
                  $scope.usuario=datos[0]; 
                  console.log("actual user:");
                  console.log($scope.usuario);

                Operaciones.operacionPorCodigoUser($scope.usuario._id)
                .then(function(datos){
                $scope.operaciones=datos; 
                console.log($scope.operaciones);
                $scope.operaciones=$scope.operaciones.filter(function(item){
                  return item.estado!='Cancelado' && item.estado!='Borrado';
                });
                
                $scope.recargarFechas=function(){
                    
                  $scope.operaciones.forEach(function(element){
                    $scope.fechas.push({
                      formateado:element.funcion.diaFormateado,
                      dia:element.funcion.diaTime
                    });
                  });
                  
                  $scope.fechas = $scope.fechas.filter((thing, index, self) => self.findIndex(t => t.formateado === thing.formateado && t.dia === thing.dia) === index); 
                  $scope.fechas =$scope.fechas.sort(function(a,b) {
                      return a.dia - b.dia;
                  });
                }


                $scope.recargarFechas();
                
                console.log($scope.fechas);
                
                

                var porcentajeDeuda = 0.6; //donde lo guarda desde configuracion de administrador?

                //Operaciones No retiradas (estado == Reservado && fechaActual > funcion.hora+30' )
                $scope.noRetiradas = $scope.operaciones.filter(function(element){
                  return (element.estado === "ReservaVencida");
                });
 

                //Operaciones Reservas (estado == Reservado && fechaActual <= funcion.hora+30' )
                $scope.reservas = $scope.operaciones.filter(function(element){
                  return (element.estado === "Reservado");
                });

                //Operaciones Compras (estado == Pagado)
                $scope.compras = $scope.operaciones.filter(function(element){
                  return (element.estado === "Pagado");
                });

                //Operaciones Retiradas (estado == Retirado)
                $scope.retiradas = $scope.operaciones.filter(function(element){
                  return (element.estado === "Retirado" || element.estado==="Cancelado");
                });

                //Hay que calcular promociones tambien?
                $scope.calcularPrecio = function (entradas){
                  var precio=0;
                  entradas.forEach(function(element) {
                    precio = precio + element.subtotal;
                  });
                  
                  return precio;

                }

                $scope.cancelar = function(operacion){
                  
                  if(operacion.estado==="Pagado"){
                    if($scope.usuario.cuentaCorriente==null){
                      $scope.usuario.cuentaCorriente=0;
                    }
                    $scope.usuario.cuentaCorriente=$scope.usuario.cuentaCorriente+$scope.calcularPrecio(operacion.entradas);
                    console.log($scope.usuario.cuentaCorriente);
                    //update de usuario? agregar campo a usuarioCuenta
                    Usuarios.modificarCuentaCorriente($scope.usuario);
                  }
                  operacion.estado="Cancelado";
                  Operaciones.modificarCompra(operacion)
                  $scope.recargarFechas();
                  $scope.reloadPage();
                  
                }

                $scope.borrar = function(operacion){
                  operacion.estado="Borrado";
                  Operaciones.modificarCompra(operacion)
                  $scope.recargarFechas();
                  $scope.reloadPage();
                }
                //agregar campo a operacion "montoDeuda" en service de lista negra, agregar montoDeuda a finalizarPago 
               /* $scope.calcularDeuda = function(entradas){
                  return $scope.calcularPrecio(entradas)*porcentajeDeuda;               
                }*/


                $scope.formatearHora = function(funcion){        	
                    var fecha = new Date(funcion.hora);
                    return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
                }

                $scope.cargar = function(datos){                                                                        
                    Datos.cargar(datos);
                }

                $scope.filtro = function(tipo){
                  if(tipo==="NoRetiradas"){                    
                    $scope.ifRetirada=true;
                    $scope.ifNoRetirada=false;
                    $scope.ifReserva=true;
                    $scope.ifCompra=true;
                    $scope.ifFechas=true;
                  }
                  if(tipo==="Reservas"){                    
                    $scope.ifRetirada=true;
                    $scope.ifNoRetirada=true;
                    $scope.ifReserva=false;
                    $scope.ifCompra=true;
                    $scope.ifFechas=false;
                  }
                  if(tipo==="Compras"){                    
                    $scope.ifRetirada=true;
                    $scope.ifNoRetirada=true;
                    $scope.ifReserva=true;
                    $scope.ifCompra=false;
                    $scope.ifFechas=false;
                  } 
                  if(tipo==="Retiradas"){                    
                    $scope.ifRetirada=false;
                    $scope.ifNoRetirada=true;
                    $scope.ifReserva=true;
                    $scope.ifCompra=true;
                    $scope.ifFechas=false;
                  }
                  if(tipo==="Todo"){                    
                    $scope.ifRetirada=false;
                    $scope.ifNoRetirada=false;
                    $scope.ifReserva=false;
                    $scope.ifCompra=false;
                    $scope.ifFechas=false;
                  }
                  console.log($scope.ifNoRetirada);
                }


              })
        .catch(function(e){
            console.log(e);
        });


        })
        .catch(function(e){
            console.log(e);
        });   
        })
        .catch(function(e){
            console.log(e);
        });     
	 
    }])
})();