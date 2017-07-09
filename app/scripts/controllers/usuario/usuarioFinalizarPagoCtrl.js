(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('usuarioFinalizarPagoCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Usuarios','Operaciones', '$window',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Usuarios,Operaciones,$window) {
        
                $scope.operacion = Datos.listado();
    

                 Tarjetas.listado()
                     .then(function(datos){
                        console.log(datos);
                        $scope.tarjetas = datos;

                         Bancos.listado()
                         .then(function(datos){
                            console.log(datos);
                            $scope.bancos = datos;
                            Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                            .then(function(datos){
                                $scope.usuario=datos[0];
                                

                                Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                                .then(function(datos){
                                    $scope.usuario=datos[0];
                                    
                                    $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                                    $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];
                                    console.log($scope.operacion);

                                    $scope.formatearHora = function(funcion){        	
                                    var fecha = new Date(funcion.hora);
                                    return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
                                }
                                
                                    
                                    $scope.imprimir=function(){
                                        $window.print();
                                    };
                                    $scope.modificarOperacion=function(){
                                        if($scope.operacion.estado=="ReservaVencida"){
                                            $scope.operacion.estado="Retirado";
                                        }
                                        if($scope.operacion.estado=="Reservado"){
                                            $scope.operacion.estado="Pagado";
                                        }
                                        $scope.usuario.listaNegra=false;
                                        $scope.operacion.montoDeuda=0;
                                        
                                         Operaciones.modificarEstadoMonto($scope.operacion)
                                          .then(function(datos){
                                            console.log(datos);
                                            Usuarios.modificarListaNegra($scope.usuario)
                                              .then(function(datos){
                                                console.log(datos);
                                                $location.path('usuarioHistorial');
                                                })
                                            .catch(function(e){
                                            console.log(e);
                                            })   
                                              })
                                        .catch(function(e){
                                        console.log(e);
                                        })   
                                         

                                    };

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
                              
                $scope.cargar = function(funcion){                
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	   }	 
        } ]) 
})();

