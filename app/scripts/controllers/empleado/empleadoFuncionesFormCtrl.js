(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesFormCtrl', ['$rootScope','$scope','Datos','$sce','Peliculas','SalasService','$location',function($rootScope,$scope,Datos,$sce,Peliculas,SalasService,$location){									
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

	     	SalasService.listado()
		    .then(function(datos){
		     console.log(datos);
		     $scope.salas = datos;

		     //Buscamos las salas del complejo del empleado		  					
		     $scope.salas = $scope.salas.filter(function(element){
	                               return (element.complejo.nombre == $rootScope.globals.currentUser.complejo.nombre);
	                            });
		     console.log($scope.salas);

		     	var proximosJueves = [];
		     	var proximasSemanas = getDates(new Date(),new Date().addDays(28));		     	
		     	for (var i = 0; i < proximasSemanas.length; i++) {
		     		if(proximasSemanas[i].getDay() == 4){		     			
		     			proximosJueves.push(proximasSemanas[i]);
		     		}
		     	}
		     	console.log(proximosJueves);
		     	var semana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		     	$scope.dias = [];
				for (var i = 0; i < proximosJueves.length; i++ ) {	   
					 $scope.dias.push(semana[proximosJueves[i].getDay()] + " - " + proximosJueves[i].getDate() + "/" + (proximosJueves[i].getMonth()+1));    
				}						
							
			/*    if(Datos.listado() == null){
			     console.log('alta ' + Datos.listado());
			     $scope.cargar = cargar;
			    	    	  	     
			     function cargar() {   
			     	console.log($scope.slide);

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
			         	    
			    	$location.path('adminSlide');
			     }

			   }else{
				    console.log('modificar' + Datos.listado());  
				    $scope.cargar = cargar;
				    
				    $scope.slide = Datos.listado();
				    console.log($scope.slide);	    	    	   	    
				     
				    function cargar() {
				    	console.log($scope.slide);	

				    	var pelicula = $scope.peliculas.filter(function(element){
						return (element._id === $scope.slide.pelicula._id);
						});

				    	$scope.slide.pelicula = pelicula[0];

				       Slides.modificar($scope.slide)
				        .then(function(datos){
				         console.log(datos);
				        })
				        .catch(function(e){
				         console.log(e);
				       });

				       Datos.limpiar(); 
				     
				       $location.path('adminSlide');
				    }
			   }*/
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


