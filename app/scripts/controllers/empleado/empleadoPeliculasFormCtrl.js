(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoPeliculasFormCtrl', ['$rootScope','$scope','Datos','$sce','Formatos','Idiomas','$location','Peliculas',
		function($rootScope,$scope,Datos,$sce,Formatos,Idiomas,$location,Peliculas){									
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
        
		$scope.estados = ["Activa", "Inactiva"];
		$scope.proximos = ["Si", "No"];
		$scope.pelicula = {
			proximamente: $scope.proximos[1]
		};
		
		 Idiomas.listado()
	     .then(function(datos){
	     console.log(datos); 
	     $scope.idiomas = datos; 

	       Formatos.listado()
		    .then(function(datos){
		     console.log(datos); 
		     $scope.formatos = datos; 

		     	$scope.proximosJueves = [];
		     	var proximasSemanas = getDates(new Date(),new Date().addDays(112));		     	
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
		     	console.log($scope.pelicula);

		     	if(!$scope.pelicula.formato || !$scope.pelicula.idioma || !$scope.pelicula.estado || !$scope.pelicula.fechaEstrenoFormat){
			    		$scope.pelicula.obligatorio = true;
			    }else{
			     	var formato = $scope.formatos.filter(function(element){
					return (element._id === $scope.pelicula.formato._id);
					});				     	
			     	formato = formato[0];
			     	console.log(formato);

					var idioma = $scope.idiomas.filter(function(element){
					return (element._id === $scope.pelicula.idioma._id);
					});				     	
			     	idioma = idioma[0];
			     	console.log(idioma);
			     	
			     	console.log($scope.pelicula.estado);

					var indice = $scope.dias.indexOf($scope.pelicula.fechaEstrenoFormat);			
					var fechaEstreno = $scope.proximosJueves[indice];
					console.log(fechaEstreno);

					$scope.pelicula.formato = formato;
					$scope.pelicula.idioma = idioma;
					$scope.pelicula.fechaEstreno = new Date(fechaEstreno.getFullYear(),fechaEstreno.getMonth(),fechaEstreno.getDate(),
                                                           0,0,0,0);

					Peliculas.alta($scope.pelicula)
			       .then(function(datos){
			        console.log(datos); 
			       })
			       .catch(function(e){
			        console.log(e);
			       });
			         	    
			    	$location.path('empleadoPeliculas');
				} 
		     }

		   }else{
			    console.log('modificar' + Datos.listado());  
			    $scope.cargar = cargar;
			    
			    $scope.pelicula = Datos.listado();
			    $scope.pelicula.fechaEstreno = new Date($scope.pelicula.fechaEstreno);
			    $scope.pelicula.fechaEstrenoFormat = semana[$scope.pelicula.fechaEstreno.getDay()] + " - " + $scope.pelicula.fechaEstreno.getDate() + "/" + ($scope.pelicula.fechaEstreno.getMonth()+1);
			    console.log($scope.pelicula);	    	    	   	    
			     
			    function cargar() {
			    	console.log($scope.pelicula);
  					
			     	if( (!$scope.pelicula.formato ||$scope.pelicula.formato === null || $scope.pelicula.formato === undefined) || 
			     		(!$scope.pelicula.idioma || $scope.pelicula.idioma === null  || $scope.pelicula.idioma === undefined) || 
			     		(!$scope.pelicula.estado || $scope.pelicula.estado === null  || $scope.pelicula.estado === undefined) || 
			     		(!$scope.pelicula.fechaEstrenoFormat || $scope.pelicula.fechaEstrenoFormat === null || $scope.pelicula.fechaEstrenoFormat === undefined)) {
				    		$scope.pelicula.obligatorio = true;
				    }else{
				     	var formato = $scope.formatos.filter(function(element){
						return (element._id === $scope.pelicula.formato._id);
						});				     	
				     	formato = formato[0];
				     	console.log(formato);

						var idioma = $scope.idiomas.filter(function(element){
						return (element._id === $scope.pelicula.idioma._id);
						});				     	
				     	idioma = idioma[0];
				     	console.log(idioma);
				     	
				     	console.log($scope.pelicula.estado);

						var indice = $scope.dias.indexOf($scope.pelicula.fechaEstrenoFormat);			
						var fechaEstreno = $scope.proximosJueves[indice];
						console.log(fechaEstreno);

						$scope.pelicula.formato = formato;
						$scope.pelicula.idioma = idioma;
						$scope.pelicula.fechaEstreno = new Date(fechaEstreno.getFullYear(),fechaEstreno.getMonth(),fechaEstreno.getDate(),
	                                                           0,0,0,0);

						Peliculas.modificar($scope.pelicula)
				       .then(function(datos){
				        console.log(datos); 
				       })
				       .catch(function(e){
				        console.log(e);
				       });
				         	    
				    	$location.path('empleadoPeliculas');
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