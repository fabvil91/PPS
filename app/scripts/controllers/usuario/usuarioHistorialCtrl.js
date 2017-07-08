(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioHistorialCtrl', ['$rootScope','$scope','Usuarios','Operaciones','Datos','$window','Funciones',
  function($rootScope,$scope,Usuarios,Operaciones,Datos,$window,Funciones){	
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
                      dia:element.funcion.diaTime,
                      show:true,
                      showString:"Ocultar"
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

                
               

                $scope.cancelar = function(operacion){
                  
                  if(operacion.estado==="Pagado"){
                    if($scope.usuario.cuentaCorriente==null){
                      $scope.usuario.cuentaCorriente=0;
                    }
                    $scope.usuario.cuentaCorriente=$scope.usuario.cuentaCorriente+operacion.funcion.precioTotal;
                    console.log($scope.usuario.cuentaCorriente);
                    
                    Usuarios.modificarCuentaCorriente($scope.usuario);
                  }
                  operacion.estado="Cancelado";
                  
                  operacion.funcion.sala.asientos.forEach(function(fila){
                    fila.forEach(function(columna){
                      if(columna.booked==false&&columna.checked==true){
                        console.log(columna.id);
                        columna.checked=false;
                      }
                    });
                  });

                  var funcionMod;
                 Funciones.listado()
                 .then(function(datos){ 
                    var funciones = datos;
                    funciones.forEach(function(item){
                      if(item._id==operacion.funcion._id){
                        item.sala=operacion.funcion.sala;
                        funcionMod=item;
                      }
                    });

                    if(funcionMod!=null){
                    Funciones.modificarSala(funcionMod);
                    }

                   })
                .catch(function(e){
                    console.log(e);
                });

                  Operaciones.modificarCompra(operacion);
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

        $scope.toggle = function(c){
          if(c.show==true){
            c.show=false;
            c.showString="Mostrar";
          }else{
            c.show=true;
            c.showString="Ocultar";
          }

        }  

        $scope.hayOperacion = function(fecha){

          var operaciones=[];
          
          //TODO
          if($scope.ifRetirada==false&&$scope.ifCompra==false&&$scope.ifNoRetirada==false&&$scope.ifReserva==false){
            $scope.operaciones.forEach(function(item){
              if(item.funcion.diaTime==fecha.dia){
                operaciones.push("yes");
              }
            });
          }
          //FILTROS
          //COMPRA
          if($scope.ifRetirada==true&&$scope.ifCompra==false&&$scope.ifNoRetirada==true&&$scope.ifReserva==true){
            $scope.operaciones.forEach(function(item){
              if(item.funcion.diaTime==fecha.dia&&item.estado=='Pagado'){          
                operaciones.push("yes");
              }
            });
          }
          //RESERVA
          if($scope.ifRetirada==true&&$scope.ifCompra==true&&$scope.ifNoRetirada==true&&$scope.ifReserva==false){
            $scope.operaciones.forEach(function(item){
              if(item.funcion.diaTime==fecha.dia&&item.estado=='Reservado'){          
                operaciones.push("yes");
              }
            });
          }
          
          //NORETIRADAS
          if($scope.ifRetirada==true&&$scope.ifCompra==true&&$scope.ifNoRetirada==false&&$scope.ifReserva==true){
            $scope.operaciones.forEach(function(item){
              if(item.funcion.diaTime==fecha.dia&&item.estado=='ReservaVencida'){          
                operaciones.push("yes");
              }
            });
          }
          
          //RETIRADAS
          if($scope.ifRetirada==false&&$scope.ifCompra==true&&$scope.ifNoRetirada==true&&$scope.ifReserva==true){
            $scope.operaciones.forEach(function(item){
              if(item.funcion.diaTime==fecha.dia&&item.estado=='Retirado'){          
                operaciones.push("yes");
              }
            });
          }
        
        //EVALUACION
          if(operaciones.length==0){
            return false;
          }else{
            return true;
          }
         

        }
	 
    }])
})();