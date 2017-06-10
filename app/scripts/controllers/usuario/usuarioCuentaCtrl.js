(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioCuentaCtrl', ['$rootScope','$scope','Tarjetas','Bancos',function($rootScope,$scope,Tarjetas,Bancos){	


        Tarjetas.listado()
            .then(function(datos){
            console.log(datos);
            $scope.tarjetas = datos;
                Bancos.listado()
                .then(function(datos){
                console.log(datos);
                $scope.bancos = datos;
                            console.log($scope.promociones);

                                    $scope.mes = [
                                    {nombre:"Enero", id:0},
                                    {nombre:"Febrero"},
                                    {nombre:"Marzo"},
                                    {nombre:"Abril"},
                                    {nombre:"Marzo"},
                                    {nombre:"Abril"},
                                    {nombre:"Mayo"},
                                    {nombre:"Junio"},
                                    {nombre:"Julio"},
                                    {nombre:"Agosto"},
                                    {nombre:"Septiembre"},
                                    {nombre:"Octubre"},
                                    {nombre:"Noviembre"},
                                    {nombre:"Diciembre"}
                                    ];
                                $scope.year = [
                                    {nombre:"2017", id:0},
                                    {nombre:"2018"},
                                    {nombre:"2019"},
                                    {nombre:"2020"},
                                    {nombre:"2021"},
                                    {nombre:"2022"},
                                    {nombre:"2023"},
                                    {nombre:"2024"}
                                ];

                                
        
                                $scope.username = $rootScope.globals.currentUser.username;
                                $scope.password = $rootScope.globals.currentUser.password;

                                $scope.datosPersonales={};
                                $scope.datosPersonales.nombre = $rootScope.globals.currentUser.datosPersonales.nombre;
                                $scope.datosPersonales.apellido = $rootScope.globals.currentUser.datosPersonales.apellido;
                                $scope.datosPersonales.mail = $rootScope.globals.currentUser.datosPersonales.mail;
                                $scope.datosPersonales.telefono = $rootScope.globals.currentUser.datosPersonales.telefono;

                                $scope.datosTarjeta={};
                                if($rootScope.globals.currentUser.datosTarjeta!=null){
                                    $scope.datosTarjeta.banco = $rootScope.globals.currentUser.datosTarjeta.banco;
                                    $scope.datosTarjeta.tarjeta=$rootScope.globals.currentUser.datosTarjeta.tarjeta;
                                    $scope.datosTarjeta.numeroTarjeta=$rootScope.globals.currentUser.datosTarjeta.numeroTarjeta;
                                    $scope.datosTarjeta.dni=$rootScope.globals.currentUser.datosTarjeta.dni;
                                    $scope.datosTarjeta.titular=$rootScope.globals.currentUser.datosTarjeta.titular;
                                    $scope.datosTarjeta.codigoSeguridad=$rootScope.globals.currentUser.datosTarjeta.codigoSeguridad;
                                    $scope.datosTarjeta.vencimiento=$rootScope.globals.currentUser.datosTarjeta.vencimiento;
                                    
                                }                                      

                                $scope.readOnlyPersonales = true;
                                $scope.readOnlyUsuario = true;
                                $scope.readOnlyTarjeta = true;
 

                                //PERMITE EDITAR
                                $scope.editar = function(editarEsto){
                                    if(editarEsto=='personales'){
                                        $scope.readOnlyPersonales=false;
                                    }
                                    if(editarEsto == 'usuario'){
                                        $scope.readOnlyUsuario=false;
                                    }
                                    if(editarEsto == 'tarjeta'){
                                        $scope.readOnlyTarjeta=false;
                                    }
                                }

                                //HACE UPDATE EN BD
                                $scope.guardar = function(seccion){
                                    console.log('guardar datos de ' + seccion + ' en db');
                                    if(seccion=='personales'){
                                        $scope.readOnlyPersonales=true;
                                        
                                    }
                                    if(seccion=='usuario'){
                                        $scope.readOnlyUsuario=true;
                                    }
                                    if(seccion=='tarjeta'){
                                        $scope.readOnlyTarjeta=true;
                                    }
                                }

                                //RECARGA DATOS
                                $scope.cancelar = function(seccion){

                                    if(seccion=='personales'){
                                        $scope.datosPersonales.nombre = $rootScope.globals.currentUser.datosPersonales.nombre;
                                        $scope.datosPersonales.apellido = $rootScope.globals.currentUser.datosPersonales.apellido;
                                        $scope.datosPersonales.mail = $rootScope.globals.currentUser.datosPersonales.mail;
                                        $scope.datosPersonales.telefono = $rootScope.globals.currentUser.datosPersonales.telefono;

                                        $scope.readOnlyPersonales=true;
                                    }
                                    
                                    if(seccion=='usuario'){
                                        $scope.username = $rootScope.globals.currentUser.username;
                                        $scope.password = $rootScope.globals.currentUser.password;

                                        $scope.readOnlyUsuario=true;
                                    }
                                    if(seccion=='tarjeta'){
                                        $scope.datosTarjeta.banco = $rootscope.datosTarjeta.banco;
                                        $scope.datosTarjeta.tarjeta=$rootScope.datosTarjeta.tarjeta;
                                        $scope.datosTarjeta.numeroTarjeta=$rootScope.datosTarjeta.numeroTarjeta;
                                        $scope.datosTarjeta.dni=$rootScope.datosTarjeta.dni;
                                        $scope.datosTarjeta.titular=$rootScope.datosTarjeta.titular;
                                        $scope.datosTarjeta.codigoSeguridad=$rootscope.datosTarjeta.codigoSeguridad;
                                        $scope.datosTarjeta.vencimiento=$rootscope.datosTarjeta.vencimiento;
                                    }
                                }



                        })
                })
        .catch(function(e){
            console.log(e);
        })
        .catch(function(e){
        console.log(e);
        })
	

        

        

		 
    }])
})();