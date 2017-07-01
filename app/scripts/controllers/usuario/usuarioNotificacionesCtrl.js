(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioCuentaCtrl', ['$rootScope','$scope','Notificaciones','Usuarios','Peliculas','Datos',function($rootScope,$scope,Notificaciones,Usuarios,Peliculas,Datos){	

        Notificaciones.listado()
            .then(function(datos){
            console.log(datos);
            $scope.tarjetas = datos;                
                Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                .then(function(datos){
                $scope.usuario=datos[0]; 
                console.log($scope.usuario);
                       
                    $scope.extender = function(){
                        Peliculas.modificarSemanas({_id : $scope.pelicula._id,
                                                    semanasActiva : $scope.pelicula.semanasActiva})
                        .then(function(datos){
                              console.log(datos);

                                Notificaciones.modificarExtendida({_id : $scope.notificacion._id,
                                                    extendida : $scope.notificacion.extendida})
                                .then(function(datos){
                                  console.log(datos);
                                })
                                .catch(function(e){
                                      console.log(e);
                                }); 
                                }
                        })
                        .catch(function(e){
                              console.log(e);
                        }); 
                        }
                    }

                            $scope.cargar = function(datos){                                                                        
                                Datos.cargar(datos);
                            }	


                        
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
    .catch(function(e){
        console.log(e);
        })	 
    }])
})();