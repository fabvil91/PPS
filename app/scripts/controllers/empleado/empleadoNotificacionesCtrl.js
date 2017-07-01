(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoNotificacionesCtrl', ['$rootScope','$scope','Notificaciones','Usuarios','Peliculas','Datos',function($rootScope,$scope,Notificaciones,Usuarios,Peliculas,Datos){	
      
        Notificaciones.listado()
            .then(function(datos){
            console.log(datos);
            
            $scope.notificaciones = datos; 

                Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                .then(function(datos){
                $scope.usuario=datos[0]; 
                console.log($scope.usuario);
                       
                    //Filtramos las funciones para el complejo actual             
                    for (var i = 0; i < $scope.notificaciones.length; i++) {
                        $scope.notificaciones[i].funciones = $scope.notificaciones[i].funciones.filter(function(element){
                            return (element.complejo.nombre == $scope.usuario.complejo.nombre);
                        });  
                        $scope.notificaciones[i].ocultar = false; 
                    }

                    $scope.extender = function(notificacion){
                        Peliculas.modificarSemanas({_id : notificacion.pelicula._id,
                                                    semanasActiva : notificacion.pelicula.semanasActiva + 1})
                        .then(function(datos){
                              console.log(datos);

                                Notificaciones.modificarExtendida({_id : notificacion._id,
                                                    extendida : true})
                                .then(function(datos){
                                  console.log(datos);
                                  notificacion.extendida = true;
                                
                                })
                                .catch(function(e){
                                      console.log(e);
                                }); 
                        })
                        .catch(function(e){
                              console.log(e);
                        }); 
                    }

                    $scope.noExtender = function(notificacion){
                                var funcionesOtrosComplejos = [];
                                for (var i = 0; i < notificacion.funciones.length; i++) {
                                    if(notificacion.funciones[i].complejo.nombre != $scope.usuario.complejo.nombre){
                                        funcionesOtrosComplejos.push(notificacion.funciones[i]);
                                    }
                                }

                                Notificaciones.modificarFunciones({_id : notificacion._id,
                                                    funciones : funcionesOtrosComplejos})
                                .then(function(datos){
                                  console.log(datos);
                                  notificacion.ocultar = true;
                                })
                                .catch(function(e){
                                      console.log(e);
                                }); 
                    }

                    $scope.extenderFuncion = function(funcion){
                       
                    }

                     $scope.noExtenderFuncion = function(funcion){
                       
                    }

                         
        })               
        .catch(function(e){
            console.log(e);
        })
        })
        .catch(function(e){
        console.log(e);
        })
     
    }])
})();