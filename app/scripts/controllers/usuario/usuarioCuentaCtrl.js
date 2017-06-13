(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioCuentaCtrl', ['$rootScope','$scope','Tarjetas','Bancos','Usuarios',function($rootScope,$scope,Tarjetas,Bancos,Usuarios){	


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
                    console.log(datos);
                    $scope.usuario=datos[0];                
                            

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

                                
        /*
                                $scope.username = $rootScope.globals.currentUser.username;
                                $scope.password = $rootScope.globals.currentUser.password;

                                $scope.datosPersonales={};
                                $scope.datosPersonales.nombre = $rootScope.globals.currentUser.datosPersonales.nombre;
                                $scope.datosPersonales.apellido = $rootScope.globals.currentUser.datosPersonales.apellido;
                                $scope.datosPersonales.mail = $rootScope.globals.currentUser.datosPersonales.mail;
                                $scope.datosPersonales.telefono = $rootScope.globals.currentUser.datosPersonales.telefono;

                                $scope.datosTarjeta={ exists:false,};
                                if($rootScope.globals.currentUser.datosTarjeta!=null){
                                    $scope.datosTarjeta.exists=true;
                                    $scope.datosTarjeta.banco = $rootScope.globals.currentUser.datosTarjeta.banco;
                                    $scope.datosTarjeta.tarjeta=$rootScope.globals.currentUser.datosTarjeta.tarjeta;
                                    $scope.datosTarjeta.numeroTarjeta=$rootScope.globals.currentUser.datosTarjeta.numeroTarjeta;
                                    $scope.datosTarjeta.dni=$rootScope.globals.currentUser.datosTarjeta.dni;
                                    $scope.datosTarjeta.titular=$rootScope.globals.currentUser.datosTarjeta.titular;
                                    $scope.datosTarjeta.codigoSeguridad=$rootScope.globals.currentUser.datosTarjeta.codigoSeguridad;
                                    $scope.datosTarjeta.vencimiento=$rootScope.globals.currentUser.datosTarjeta.vencimiento;
                                    
                                } 
        */                        
                                
                                             
                                $scope.addTarjeta=false;
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
                                        Usuarios.modificarPersonales($scope.usuario);
                                    }
                                    if(seccion=='usuario'){
                                        $scope.readOnlyUsuario=true;
                                        Usuarios.modificar($scope.usuario);
                                    }
                                    if(seccion=='tarjeta' && $scope.usuario.datosTarjeta){
                                        //UPDATE
                                        $scope.readOnlyTarjeta=true;
                                        Usuarios.modificarTarjeta($scope.usuario);
                                    }
                                    if(seccion=='tarjeta' && $scope.usuario.datosTarjeta==null){
                                        //ALTA
                                        $scope.readOnlyTarjeta=true;
                                    }
                                }

                                //RECARGA DATOS
                                $scope.cancelar = function(seccion){
                                    Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                                    .then(function(datosViejos){

                                            if(seccion=='personales'){
                                                $scope.usuario.datosPersonales.nombre = datosViejos[0].datosPersonales.nombre;
                                                $scope.usuario.datosPersonales.apellido = datosViejos[0].datosPersonales.apellido;
                                                $scope.usuario.email=datosViejos[0].email;
                                                $scope.usuario.datosPersonales.telefono = datosViejos[0].datosPersonales.telefono;

                                                $scope.readOnlyPersonales=true;
                                            }
                                        
                                            if(seccion=='usuario'){
                                                $scope.usuario.username = datosViejos[0].username;
                                                $scope.usuario.password = datosViejos[0].password;

                                                $scope.readOnlyUsuario=true;
                                            }
                                            if(seccion=='tarjeta'){
                                                $scope.usuario.datosTarjeta.banco = datosViejos[0].datosTarjeta.banco;
                                                $scope.usuario.datosTarjeta.tarjeta=datosViejos[0].datosTarjeta.tarjeta;
                                                $scope.usuario.datosTarjeta.numeroTarjeta=datosViejos[0].datosTarjeta.numeroTarjeta;
                                                $scope.usuario.datosTarjeta.dni=datosViejos[0].datosTarjeta.dni;
                                                $scope.usuario.datosTarjeta.titular=datosViejos[0].datosTarjeta.titular;
                                                $scope.usuario.datosTarjeta.codigoSeguridad=datosViejos[0].datosTarjeta.codigoSeguridad;
                                                $scope.usuario.datosTarjeta.vencimiento=datosViejos[0].datosTarjeta.vencimiento;
                                            }
                                    })
                                    .catch(function(e){
                                        console.log(e);
                                    })
                                }

                                $scope.borrarTarjeta = function(){

                                }


                            })
                        })
                })
        .catch(function(e){
            console.log(e);
        })
        .catch(function(e){
        console.log(e);
    })
    .catch(function(e){
        console.log(e);
        })
	

        

        

		 
    }])
})();