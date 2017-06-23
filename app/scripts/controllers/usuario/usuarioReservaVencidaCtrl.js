(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('usuarioReservaVencidaCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Usuarios','Operaciones',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Usuarios,Operaciones) {
        
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
                                console.log("root user:");
                                console.log($scope.usuario);

                                Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                                .then(function(datos){
                                    $scope.usuario=datos[0];
                                    console.log("actual user:");
                                    console.log($scope.usuario);
                                    $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                                    $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];

                                    if($scope.usuario.datosTarjeta!=null){
                                        
                                        
                                        $scope.operacion.codigoSeguridad=$scope.usuario.datosTarjeta.codigoSeguridad;
                                        $scope.operacion.dniTitular=$scope.usuario.datosTarjeta.dni;
                                        $scope.operacion.fechaVencimiento=$scope.usuario.datosTarjeta.vencimiento;
                                        $scope.operacion.nombreTitular=$scope.usuario.datosTarjeta.titular;
                                        $scope.operacion.nroTarjeta=$scope.usuario.datosTarjeta.numeroTarjeta;

                                        var banco = $scope.bancos.filter(function(element){
                                        return (element._id === $scope.usuario.datosTarjeta.banco._id);
                                        });
                                        $scope.operacion.banco=banco[0];
                                        var tarjeta = $scope.tarjetas.filter(function(element){
                                        return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                                        });
                                        $scope.operacion.tarjeta=tarjeta[0];
                                        
                                    
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

