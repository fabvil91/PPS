(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesFormCtrl', ['$rootScope','$scope','Datos','$sce','Peliculas','SalasService','$location','Horarios',
		function($rootScope,$scope,Datos,$sce,Peliculas,SalasService,$location,Horarios){									
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
							
			   if(Datos.listado() == null){
			     console.log('alta ' + Datos.listado());
			     $scope.cargar = cargar;
			    	    	  	     
			     function cargar() { 
			     	var pelicula = $scope.peliculas.filter(function(element){
					return (element._id === $scope.funcion.pelicula._id);
					});	
			     	console.log(pelicula);
					var sala = $scope.salas.filter(function(element){
					return (element._id === $scope.funcion.sala._id);
					});	
					console.log(sala);
					var indice = $scope.dias.indexOf($scope.funcion.dia);			
					var dia = $scope.proximosJueves[indice];
					console.log(dia);
			     	/*
                        console.log(Horarios.generar(funcion.pelicula, funcion.complejo));
                        var horarios = Horarios.generar(funcion.pelicula, funcion.complejo);
                        
                        notificacion.pelicula.fechaEstreno = new Date(notificacion.pelicula.fechaEstreno);
                        var limiteInf = notificacion.pelicula.fechaEstreno.addDays(7 * notificacion.pelicula.semanasActiva);              
                        var limiteSup = limiteInf.addDays(7);
                        var proximaSemana = getDates(limiteInf,limiteSup.addDays(-1));
                        console.log(proximaSemana);*/

			     	/*console.log($scope.slide);

			     	var pelicula = $scope.peliculas.filter(function(element){
					return (element._id === $scope.slide.pelicula._id);
					});

			    	$scope.slide.pelicula = pelicula[0];

			       Slides.alta($scope.slide)
			       .then(function(datos){
			        console.log(datos);
			       })
			       .catch(function(e){
			        console.log(e);
			       });
			         	    
			    	$location.path('adminSlide');*/
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


