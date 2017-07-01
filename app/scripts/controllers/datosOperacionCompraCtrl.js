(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('datosOperacionCompraCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Promociones','Usuarios',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Promociones,Usuarios) {
        
                $scope.funcion = Datos.listado();

                 Tarjetas.listado()
                     .then(function(datos){
                        console.log(datos);
                        $scope.tarjetas = datos;

                         Bancos.listado()
                         .then(function(datos){
                            console.log(datos);
                            $scope.bancos = datos;

                                 Promociones.listado()
                                 .then(function(datos){
                                    console.log(datos);
                                    $scope.promociones = datos;

                                    Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                                    .then(function(datos){
                                        $scope.usuario=datos[0];
                                        console.log("root user:");
                                        console.log($scope.usuario);

                                        Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                                        .then(function(datos){
                                            $scope.usuario=datos[0];
                                            console.log("actual user:");
                                            console.log($scope.usuario);

                                            $scope.promociones = $scope.promociones.filter(function(element){
                                                return (element.banco != null && element.tarjeta != null);
                                            });
                                            console.log($scope.promociones);

                                                $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                                                $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];

                                                $scope.funcion.operacion = {
                                                    vencimiento:{}
                                                };
                                                $scope.hayPromo = false;
                                                for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                                                    if($scope.funcion.entradas[i].promocion && $scope.funcion.entradas[i].cantidad > 0){
                                                        $scope.hayPromo = true;
                                                        break;
                                                    }
                                                }
                                                console.log($scope.hayPromo);

                                                if($scope.usuario.datosTarjeta!=null){                                        
                                            
                                                    $scope.funcion.operacion.codigoSeguridad=$scope.usuario.datosTarjeta.codigoSeguridad;
                                                    $scope.funcion.operacion.dniTitular=$scope.usuario.datosTarjeta.dni;
                                                    $scope.funcion.operacion.fechaVencimiento=$scope.usuario.datosTarjeta.vencimiento;
                                                    $scope.funcion.operacion.nombreTitular=$scope.usuario.datosTarjeta.titular;
                                                    $scope.funcion.operacion.nroTarjeta=$scope.usuario.datosTarjeta.numeroTarjeta;

                                                    var banco = $scope.bancos.filter(function(element){
                                                    return (element._id === $scope.usuario.datosTarjeta.banco._id);
                                                    });
                                                    $scope.funcion.operacion.banco=banco[0];
                                                    var tarjeta = $scope.tarjetas.filter(function(element){
                                                    return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                                                    });
                                                    $scope.funcion.operacion.tarjeta=tarjeta[0];                                          
                                            
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

