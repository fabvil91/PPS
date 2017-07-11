(function(){
	'use strict';
	angular.module('cine')
	.controller('mainCtrl', ['$rootScope','$scope','Datos','Complejos','Formatos','Idiomas','Slides','Funciones','Peliculas','Operaciones','Constantes',
	function($rootScope,$scope,Datos,Complejos,Formatos,Idiomas,Slides,Funciones,Peliculas,Operaciones,Constantes){		
		 $scope.filtro = {};
		 $scope.funciones = [];
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

							//MAS VISTAS
							Peliculas.listado()
							.then(function(datos){
								var peliculas = datos;								
								Constantes.listado()
								.then(function(datos){
								var cantPeliculas=datos[0].cantidadPeliculasMasVistas;
								//Trae peliculas en estado Activa
								$scope.peliculasActivas = peliculas.filter(function(item){
									return item.estado=="Activa";
								});
																
								console.log("PELICULAS ACTIVAS");
								console.log($scope.peliculasActivas);

								Operaciones.listado()
								.then(function(datos){
									var operaciones = datos;
									$scope.operacionesActivas=[];
									//Trae todas las operaciones en estado Retirado que match alguna de las peliculas activas
									operaciones.forEach(function(item){
										$scope.peliculasActivas.forEach(function(pel){
											if(item.funcion.pelicula.nombre==pel.nombre && item.estado=="Retirado"){
												console.log(item.funcion.pelicula.nombre, pel.nombre,item.estado);

												$scope.operacionesActivas.push(item);
											}
										});

									});
									console.log("OPERACIONES ACTIVAS");
									console.log($scope.operacionesActivas);

									//Calcula entradas retiradas de cada pelicula activa y lo agrega como un campo
									$scope.peliculasActivas.forEach(function(item){
										var cantidad = 0;
										$scope.operacionesActivas.forEach(function(op){
											if(op.funcion.pelicula.nombre==item.nombre){
												op.entradas.forEach(function(ent){
													cantidad=cantidad+ent.cantidad;
												});
											}
										});
										item.cantEntradas=cantidad;
										console.log("ENTRADAS");
										console.log(item.nombre, item.cantEntradas);
									});

									//SORT & SLICE									
									$scope.peliculasActivas.sort(function(a,b){
										var aEnt = a.cantEntradas;
										var bEnt = b.cantEntradas;
										return bEnt - aEnt;
									});
									$scope.peliculasActivas=$scope.peliculasActivas.slice(0,cantPeliculas);

									//Carga funciones de la pelicula, para poder pasarselo a detallePelicula
								//	if($scope.funciones != null){
								//	$scope.peliculasActivas.forEach(function(peli){
									//	var funcionesPeli = [];
									//	$scope.funciones.forEach(function(item){
									//		if(item.pelicula._id==peli._id){
									//			funcionesPeli.push(item);
									//		}
									//	});	
										//peli.funciones=funcionesPeli;									
											
								//	});
								//	}

									//PROXIMOS ESTRENOS
									$scope.estrenos = peliculas.filter(function(item){
										return item.proximamente=='Si';
									});
									console.log($scope.estrenos);
									var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
									"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
									];

									
									$scope.estrenos.forEach(function(pelicula){
										var fecha = new Date(pelicula.fechaEstreno);
										if(fecha.getFullYear()!=new Date().getFullYear()){
											pelicula.mes=fecha.getFullYear();
										}else{
										pelicula.mes= meses[fecha.getMonth()];
										}										
									}); 									
						  })
					     .catch(function(e){
					       console.log(e);
					     });
						 })
					     .catch(function(e){
					       console.log(e);
					     });
						  })
					     .catch(function(e){
					       console.log(e);
					     });
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
	     
	     $scope.buscarFunciones = function(){
	     				console.log($scope.filtro);     
					    Funciones.listadoFiltradoMain($scope.filtro)
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
							
			  })
		     .catch(function(e){
		       console.log(e);
		     })
	     }
	
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

		$scope.cargarMas = function(pelicula){
			/*console.log($scope.filtro);													
			$scope.filtro.formato == null ? funcion.filtroFormato = false : funcion.filtroFormato = true;
			$scope.filtro.idioma == null ? funcion.filtroIdioma = false : funcion.filtroIdioma = true;
			$scope.filtro.complejo == null ? funcion.filtroComplejo = false : funcion.filtroComplejo = true;
			$scope.filtro.diaLocale == null ? funcion.filtroDia = false : funcion.filtroDia = true;*/
			
			console.log(pelicula);
			Datos.cargar(pelicula);
		}

		$scope.cargarPelicula=function(pelicula){
			Datos.cargar(pelicula);
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