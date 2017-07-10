(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesFormCtrl', ['$rootScope','$scope','Datos','$sce','Peliculas','SalasService','$location','Horarios','Funciones',
		function($rootScope,$scope,Datos,$sce,Peliculas,SalasService,$location,Horarios,Funciones){									
        /* Verifica si dos dias son iguales */ 
		Date.prototype.isGreaterOrEqualAs = function(pDate) {
		  return (
		    this.getFullYear() >= pDate.getFullYear() &&
		    this.getMonth() >= pDate.getMonth() &&
		    this.getDate() >= pDate.getDate()
		  );
		}

		/* Suma dias a una fecha */
		Date.prototype.addDays = function(days) {
		var dat = new Date(this.valueOf())
		dat.setDate(dat.getDate() + days);
		return dat;
		}	

		/* Verifica si dos dias son iguales */ 
        Date.prototype.isSameDateAs = function(pDate) {        
          return (
            this.getFullYear() === pDate.getFullYear() &&
            this.getMonth() === pDate.getMonth() &&
            this.getDate() === pDate.getDate()
          );
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

        $scope.funcion = {};

       Peliculas.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.peliculas = datos;

	     //Buscamos las peliculas activas		  					
	     $scope.peliculas = $scope.peliculas.filter(function(element){
                               return (element.estado == 'Activa' && 
                               		   new Date(element.fechaEstreno).addDays(7 * element.semanasActiva).addDays(-1).isGreaterOrEqualAs(new Date()));
                            });
	     console.log($scope.peliculas);
	     
	     for (var i = 0; i < $scope.peliculas.length; i++) {
	     	$scope.peliculas[i].formateada = $scope.peliculas[i].nombre + " - " + $scope.peliculas[i].formato.nombre + " - " + $scope.peliculas[i].idioma.nombre;
	     }

	     	SalasService.listado()
		    .then(function(datos){
		     console.log(datos);
		     $scope.salas = datos;

		     //Buscamos las salas del complejo del empleado		  					
		     $scope.salas = $scope.salas.filter(function(element){
	                               return (element.complejo.nombre == $rootScope.globals.currentUser.complejo.nombre);
	                            });
		     console.log($scope.salas);
		     
		     for (var i = 0; i < $scope.salas.length; i++) {
		     	$scope.salas[i].formateada = $scope.salas[i].nombre + " - " + $scope.salas[i].formato.nombre + " - " + $scope.salas[i].complejo.nombre;
		     }

		     	$scope.proximosJueves = [];
		     	var proximasSemanas = getDates(new Date(),new Date().addDays(28));		     	
		     	for (var i = 0; i < proximasSemanas.length; i++) {
		     		if(proximasSemanas[i].getDay() == 4){		     			
		     			$scope.proximosJueves.push(proximasSemanas[i]);
		     		}
		     	}
		     	console.log($scope.proximosJueves);
		     	var semana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		     	$scope.dias = [];
				for (var i = 0; i < $scope.proximosJueves.length; i++ ) {	   
					 $scope.dias.push(semana[$scope.proximosJueves[i].getDay()] + " - " + $scope.proximosJueves[i].getDate() + "/" + ($scope.proximosJueves[i].getMonth()+1));    
				}						
							    	  	     
			    $scope.cargar = function() {
			    	console.log($scope.funcion);
			    	if(!$scope.funcion.pelicula || !$scope.funcion.sala || !$scope.funcion.dia){
			    		$scope.funcion.obligatorio = true;
			    	}else{

			     	var pelicula = $scope.peliculas.filter(function(element){
					return (element._id === $scope.funcion.pelicula._id);
					});				     	
			     	pelicula = pelicula[0];
			     	console.log(pelicula);

					var sala = $scope.salas.filter(function(element){
					return (element._id === $scope.funcion.sala._id);
					});						
					sala = sala[0];
					console.log(sala);

					var indice = $scope.dias.indexOf($scope.funcion.dia);			
					var dia = $scope.proximosJueves[indice];
					console.log(dia);
					if(sala.formato.nombre == '2D' && pelicula.formato.nombre != '2D'){
						console.log("sala 2d peli no 2d");
                        $scope.funcion.sala2DError = true;
					}else if(sala.formato.nombre == '3D' && pelicula.formato.nombre != '2D' && pelicula.formato.nombre != '3D'){
						console.log("sala 3d peli no 2d ni 3d");
                        $scope.funcion.sala3DError = true;
					}else{	
			     		/* Generamos horarios en base a pelicula y complejos */                        
                        console.log(Horarios.generar(pelicula, sala.complejo));
                        var horarios = Horarios.generar(pelicula, sala.complejo);
                        /* Generamos proxima semana de funciones */
                        var limiteInf = new Date(dia);                                
                        var limiteSup = limiteInf.addDays(7);
                        var proximaSemana = getDates(limiteInf,limiteSup.addDays(-1));
                        console.log(proximaSemana);

                        var funciones = [];

                        Funciones.listado()
                        .then(function(datos){
                        console.log(datos);
                            /* Determinamos si la sala, en la semana proxima, tiene funciones asignadas */
                            funciones = datos.filter(function(element){
                               return (element.complejo.nombre == sala.complejo.nombre);
                            });
                            var salaOcupada = false;
                            for (var i = 0; (i < proximaSemana.length && !salaOcupada); i++) {
                                for (var j = 0;  (j < funciones.length && !salaOcupada); j++) {
                                // console.log(proximaSemana[i]);
                                 //console.log(funciones[j]);                                     
                                if(proximaSemana[i].isSameDateAs(new Date(funciones[j].dia)) 
                                    && sala.nombre == funciones[j].sala.nombre
                                    && sala.complejo.nombre == funciones[j].sala.complejo.nombre ){                                                         
                                    salaOcupada = true;                                
                                }
                              }
                            }
                            if(salaOcupada){
                                console.log("salaOcupada");
                                $scope.funcion.salaOcupada = true;
                            }else{
                                /* Generamos las funciones y las insertamos en la BD*/                              
                                    var funcionesProximas = [];
                                    for (var i = 0; i < proximaSemana.length; i++) {
                                        for (var j = 0; j < horarios.length; j++) {
                                        funcionesProximas.push({
                                            pelicula: pelicula,
                                            formato: sala.formato,
                                            complejo: sala.complejo,
                                            idioma: pelicula.idioma,
                                            dia: new Date(proximaSemana[i].getFullYear(),proximaSemana[i].getMonth(),proximaSemana[i].getDate(),
                                                           0,0,0,0),
                                            hora: new Date(proximaSemana[i].getFullYear(),proximaSemana[i].getMonth(),proximaSemana[i].getDate(),
                                                           horarios[j].getHours(),horarios[j].getMinutes(),horarios[j].getSeconds(),0),//horarios[j]
                                            sala: sala,
                                            fechaCreacion: new Date()
                                          });  
                                        }
                                    }
                                    console.log(funcionesProximas);

                                    for (var i = 0; i < funcionesProximas.length; i++) {
                                        //if(i == 3) break;                                        
                                         Funciones.alta(funcionesProximas[i])
                                        .then(function(datos){
                                            console.log(datos);                                                                                        
                                        })
                                        .catch(function(e){
                                           console.log(e);
                                        });
                                    }
                                    $location.path('/empleadoFunciones');                                   
                                }                               
                        })                                                
                        .catch(function(e){
                           console.log(e);
                        });
                       }    
                     }       			         	    			    	
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