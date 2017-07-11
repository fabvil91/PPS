(function(){
	'use strict';
	angular.module('cine')
	.controller('detallePeliculaCtrl', ['$rootScope','$scope','Datos','$sce','Salas','Complejos','Formatos','Idiomas','Slides','Funciones',function($rootScope,$scope,Datos,$sce,Salas,
		Complejos,Formatos,Idiomas,Slides,Funciones){	
	
		$scope.filtro = {};
	
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
				      		currentDate.setHours(0,0,0,0);
				        	dateArray.push(currentDate);
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
								
						$scope.filtrarDia = function(){									
							var indice = $scope.fechasDias.indexOf($scope.filtro.diaNombre);			
							var dia = $scope.fechas[indice];
							
							$scope.filtro.diaLocale = dia.getTime();					
							console.log($scope.filtro);
						}
								
						$scope.limpiarFiltro = function (){
							console.log($rootScope);
							$scope.filtro = {};			 
						}
						
						/* Cargamos en los filtros lo seleccionado en la pantalla anterior (main) */
						if(Datos.listado().pelicula != null){
							console.log("Viene del Main");
							$scope.filtro.pelicula = Datos.listado().pelicula;
							if(Datos.listado().filtroDia){			
								$scope.filtro.diaNombre = $scope.dias[new Date(Datos.listado().dia).getDay()] + " - " + new Date(Datos.listado().dia).getDate() + "/" + (new Date(Datos.listado().dia).getMonth()+1);
								$scope.filtro.diaLocale = new Date(Datos.listado().dia).getTime();
							}
							if(Datos.listado().filtroFormato){																
								$scope.filtro.formato = Datos.listado().formato._id;							
							}
							if(Datos.listado().filtroIdioma){			
								$scope.filtro.idioma = Datos.listado().idioma._id;
							}
							if(Datos.listado().filtroComplejo){										
								$scope.filtro.complejo = Datos.listado().complejo._id;
							}

							if(Datos.listado().filtroDia && Datos.listado().filtroFormato && Datos.listado().filtroIdioma && Datos.listado().filtroComplejo){
								console.log("Eligio todos los filtros");
								$scope.buscarFunciones();
							}
						}else{
							console.log("Viene del Main-Mas Vistas");
							$scope.filtro.pelicula = Datos.listado();
						}
											
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

		$scope.buscarFunciones = function(){
					      	console.log($scope.filtro);     
					     	Funciones.listadoFiltrado($scope.filtro)
						     .then(function(datos){
						     	console.log(datos);

							        $scope.funciones = datos;
									/* Filtramos solo las funciones desde la fecha actual */											
									var funcionesDesdeAhora = [];

									for (var i = $scope.funciones.length - 1; i >= 0; i--) {				
										$scope.funciones[i].diaTime = new Date($scope.funciones[i].dia).getTime();

										if(new Date($scope.funciones[i].hora).getTime() >= new Date().getTime()){
											funcionesDesdeAhora.push($scope.funciones[i]);
										}
									}
									$scope.funciones = funcionesDesdeAhora;
									console.log($scope.funciones);							
								

									/* Generamos campo nuevo con dia formateado en la funcion */						
									for (var i = 0; i < $scope.funciones.length; i++ ) {	   
									  var funciones = $scope.funciones;
						       		  funciones[i].diaFormateado = $scope.dias[new Date(funciones[i].dia).getDay()] + " - " + new Date(funciones[i].dia).getDate() + "/" + (new Date(funciones[i].dia).getMonth()+1);       		  
									}
									console.log($scope.funciones);						
								 })
					     .catch(function(e){
					       console.log(e);
					     })
						}

        $scope.formatear = function(funcion){        	
        	return funcion.replace(/,/g, " > ");
        }

      /*   $scope.formatearHora = function(funcion){        	
        	var fecha = new Date(funcion.hora);
        	return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
        }*/

        $scope.formatearHora = function(funcion){          
	      var fecha = new Date(funcion.hora);
	      return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes() < 10? "0"+fecha.getMinutes() : fecha.getMinutes());
	    } 

		$scope.panelString={nombre:"Sinopsis"};

		$scope.switch=function(v){
			console.log("BEFORE",$scope.panelString);
			if(v=="Sinopsis"){
				$scope.panelString.nombre="Ficha Técnica";
			}else{
				$scope.panelString.nombre="Sinopsis";			
			}
			
			console.log("AFTER",$scope.panelString);
		}

        $scope.cargar = function(funcion){
        	console.log(funcion);        	      	
			Datos.cargar(funcion);
        }
    }])
})();