(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoNotificacionesCtrl', ['$rootScope','$scope','Notificaciones','Usuarios','Peliculas','Datos','Horarios','Funciones','SalasService',
        function($rootScope,$scope,Notificaciones,Usuarios,Peliculas,Datos,Horarios,Funciones,SalasService){	
        /* Suma dias a una fecha */
        Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
        }

        /* Devuelve las fechas entre dos limites */
        function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
        }
        return dateArray;
        }

        /* Verifica si dos dias son iguales */ 
        Date.prototype.isSameDateAs = function(pDate) {
          return (
            this.getFullYear() === pDate.getFullYear() &&
            this.getMonth() === pDate.getMonth() &&
            this.getDate() === pDate.getDate()
          );
        }    
            
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
                                })
                                .catch(function(e){
                                      console.log(e);
                                }); 
                    }

                    $scope.extenderFuncion = function(notificacion,funcion){
                        /* Generamos horarios en base a pelicula y complejos */                        
                        console.log(Horarios.generar(funcion.pelicula, funcion.complejo));
                        var horarios = Horarios.generar(funcion.pelicula, funcion.complejo);
                        /* Generamos proxima semana de funciones */
                        notificacion.pelicula.fechaEstreno = new Date(notificacion.pelicula.fechaEstreno);
                        var limiteInf = notificacion.pelicula.fechaEstreno.addDays(7 * notificacion.pelicula.semanasActiva);              
                        var limiteSup = limiteInf.addDays(7);
                        var proximaSemana = getDates(limiteInf,limiteSup.addDays(-1));
                        console.log(proximaSemana);

                        var funciones = [];

                        Funciones.listado()
                        .then(function(datos){
                        console.log(datos);
                            /* Determinamos si la sala, en la semana proxima, tiene funciones asignadas */
                            funciones = datos.filter(function(element){
                               return (element.complejo.nombre == $scope.usuario.complejo.nombre);
                            });
                            var salaOcupada = false;
                            for (var i = 0; (i < proximaSemana.length && !salaOcupada); i++) {
                                for (var j = 0;  (j < funciones.length && !salaOcupada); j++) {
                                                                
                                if(proximaSemana[i].isSameDateAs(new Date(funciones[j].dia)) 
                                    && funcion.sala.nombre == funciones[j].sala.nombre
                                    && funcion.sala.complejo.nombre == funciones[j].sala.complejo.nombre ){ 
                                    console.log(proximaSemana[i]);
                                    console.log(funciones[j]);                          
                                    salaOcupada = true;                                
                                }
                              }
                            }
                            if(salaOcupada){
                                console.log("salaOcupada");
                            }else{
                                /* Generamos las funciones y las insertamos en la BD*/
                                SalasService.getById(funcion.sala._id)
                                .then(function(datos){
                                    console.log(datos);
                                    var funcionesProximas = [];
                                    for (var i = 0; i < proximaSemana.length; i++) {
                                        for (var j = 0; j < horarios.length; j++) {
                                        funcionesProximas.push({
                                            pelicula: funcion.pelicula,
                                            formato: funcion.formato,
                                            complejo: funcion.complejo,
                                            idioma: funcion.idioma,
                                            dia: proximaSemana[i],
                                            hora: new Date(proximaSemana[i].getFullYear(),proximaSemana[i].getMonth(),proximaSemana[i].getDate(),
                                                           horarios[j].getHours(),horarios[j].getMinutes(),horarios[j].getSeconds(),0),//horarios[j]
                                            sala: datos[0]
                                          });  
                                        }
                                    }
                                    console.log(funcionesProximas);

                                    for (var i = 0; i < funcionesProximas.length; i++) {
                                        if(i == 3) break;                                        
                                         Funciones.alta(funcionesProximas[i])
                                        .then(function(datos){
                                            console.log(datos);
                                            /* Borrar el renglon de notificacion */
                                            $scope.noExtenderFuncion(notificacion,funcion);
                                        })
                                        .catch(function(e){
                                           console.log(e);
                                        });
                                    }                                    
                                })
                                .catch(function(e){
                                   console.log(e);
                                })
                            }
                        })
                        .catch(function(e){
                           console.log(e);
                        });                         
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