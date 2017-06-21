(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioCuentaCtrl', ['$rootScope','$scope','Tarjetas','Bancos','Usuarios','Datos',function($rootScope,$scope,Tarjetas,Bancos,Usuarios,Datos){	


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
                    console.log($scope.usuario);
                    
                    if($scope.usuario.datosTarjeta!=null){
                        var banco = $scope.bancos.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.banco._id);
                        });

                        $scope.usuario.datosTarjeta.banco.nombre = banco[0].nombre;

                        var tarjeta = $scope.tarjetas.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                        });

                        $scope.usuario.datosTarjeta.tarjeta.nombre = tarjeta[0].nombre;
                    }
                                  


                                $scope.readOnlyPersonales = true;
                                $scope.readOnlyUsuario = true;
                             


                                //PERMITE EDITAR
                                $scope.editar = function(editarEsto){
                                    if(editarEsto=='personales'){
                                        $scope.readOnlyPersonales=false;
                                    }
                                    if(editarEsto == 'usuario'){
                                        $scope.readOnlyUsuario=false;
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
                                                $scope.usuario.tipoUsuario=datosViejos[0].tipoUsuario;
                                                $scope.readOnlyUsuario=true;
                                            }
                                    })
                                    .catch(function(e){
                                        console.log(e);
                                    })
                                } 
                                

                                $scope.borrarTarjeta = function(){
                                    Usuarios.borrarTarjeta($scope.usuario);
                                    delete $scope.usuario.datosTarjeta;

                                }

                                $scope.cargar = function(datos){
                                                                        
                                    Datos.cargar(datos);
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