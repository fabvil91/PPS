(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoNotificacionesCtrl', ['$rootScope','$scope','Notificaciones','Usuarios','Peliculas','Datos','Horarios',
        function($rootScope,$scope,Notificaciones,Usuarios,Peliculas,Datos,Horarios){	
      
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
                        //$scope.notificaciones[i].ocultar = false; 
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
                                  notificacion.funciones = [];
                                 // notificacion.ocultar = true;
                                 // var pos = $scope.notificaciones.indexOf(notificacion);
                                 // $scope.notificaciones.splice(pos, 1);
                                })
                                .catch(function(e){
                                      console.log(e);
                                }); 
                    }

                    $scope.extenderFuncion = function(funcion){
                       console.log(Horarios.generar(funcion.pelicula, funcion.complejo));
                    }

                     $scope.noExtenderFuncion = function(notificacion,funcion){
                       var pos = notificacion.funciones.indexOf(funcion);
                       notificacion.funciones.splice(pos, 1);

                       Notificaciones.modificarFunciones({_id : notificacion._id,
                                                    funciones : notificacion.funciones})
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
        })
        })
        .catch(function(e){
        console.log(e);
        })
     
    }])
})();