(function(){
	'use strict';
	angular.module('cine')
	.controller('mainCtrl', ['$rootScope','$scope','Datos','Complejos','Formatos','Idiomas','Slides','Funciones',function($rootScope,$scope,Datos,Complejos,Formatos,Idiomas,Slides,Funciones){		
		 $scope.filtro = {};

		 $scope.myInterval = 3000;

		 Complejos.listado()
	     .then(function(datos){
	     	console.log(datos);
	        $scope.complejos = datos;

	        Formatos.listado()
		    .then(function(datos){
		    	console.log(datos);
		        $scope.formatos = datos;

		        Idiomas.listado()
			    .then(function(datos){
			     	console.log(datos);
			        $scope.idiomas = datos;

			        Slides.listado()
				    .then(function(datos){
				     	console.log(datos);
				        $scope.slides = datos;

				        Funciones.listado()
					     .then(function(datos){
					     	console.log(datos);

					        $scope.funciones = datos;
					        /* Filtramos solo las funciones desde la fecha actual */
					        (function(){						
							var funcionesDesdeAhora = [];

							for (var i = $scope.funciones.length - 1; i >= 0; i--) {				
								$scope.funciones[i].diaTime = new Date($scope.funciones[i].dia).getTime();

								if(new Date($scope.funciones[i].hora).getTime() >= new Date().getTime()){
									funcionesDesdeAhora.push($scope.funciones[i]);
								}
							}
							$scope.funciones = funcionesDesdeAhora;
							console.log($scope.funciones);			
							})();
							
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

					    	/* Generamos los elementos formateados para el combo de dias */
							$scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
							var hoy = new Date();
							hoy.setHours(0,0,0,0);
							var proxSem = (new Date()).addDays(6);
							proxSem.setHours(0,0,0,0);
									
							$scope.fechas = getDates(hoy,proxSem);
							$scope.fechasDias = [];

							(function (){							
								for (var i = 0; i < $scope.fechas.length; i++ ) {	   
					       		  $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()] + " - " + $scope.fechas[i].getDate() + "/" + ($scope.fechas[i].getMonth()+1));    
								}						
							})(); 														
					     })
					     .catch(function(e){
					       console.log(e);
					     });
				    })
				    .catch(function(e){
				       console.log(e);
				    })
			    })
			    .catch(function(e){
			       console.log(e);
			    })
		    })
		    .catch(function(e){
		       console.log(e);
		    })
	     })
	     .catch(function(e){
	       console.log(e);
	     })
	
		$scope.filtrarDia = function(){									
			var indice = $scope.fechasDias.indexOf($scope.filtro.dia);			
			var dia = $scope.fechas[indice];
			
			$scope.filtro.diaLocale = dia.getTime();	

			console.log($scope.filtro);				
		}
				
		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};			
		}

		$scope.cargar = function(funcion){
			console.log($scope.filtro);													
			$scope.filtro.formato == null ? funcion.filtroFormato = false : funcion.filtroFormato = true;
			$scope.filtro.idioma == null ? funcion.filtroIdioma = false : funcion.filtroIdioma = true;
			$scope.filtro.complejo == null ? funcion.filtroComplejo = false : funcion.filtroComplejo = true;
			$scope.filtro.diaLocale == null ? funcion.filtroDia = false : funcion.filtroDia = true;
			
			console.log(funcion);
			Datos.cargar(funcion);
		}

		$scope.cargarSlide = function(slide){
			console.log(slide);																						
			Datos.cargar(slide);
		}

		$scope.loguear = function(){
			console.log($scope.filtro);
		}						
	}]);
})();