(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('usuarioImprimirCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Usuarios','Operaciones', '$window',
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
                                console.log($scope.operacion);
                                    
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
                                         Operaciones.modificarTarjeta($scope.operacion);
                                    };
                                    $scope.calcularPrecio = function (entradas){
                                var precio=0;
                                entradas.forEach(function(element) {
                                    precio = precio + element.subtotal;
                                });
                                
                                return precio;

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
                              
                $scope.cargar = function(funcion){                
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	   }	 
        } ]) 
})();

