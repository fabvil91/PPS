(function(){
	'use strict';
	angular.module('cine')
	.controller('detallePeliculaCtrl', ['$rootScope','$scope','Datos',function($rootScope,$scope,Datos){	
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];
		$scope.idiomas = ["Español", "Subtitulado"];

		$scope.filtro = {};

		$scope.funciones = [
			{
				pelicula: {imageUrl: "images/peliculas/StarWars.jpg",
			 			   nombre: "Star Wars",
			 			   descripcion: "Episodio 7",
			 			   genero: "Space Opera",
						   duracion: "98",
						   tituloOriginal: "Star Wars",
						   director: "JJ Abrams",
						   calificacion: "+13"},						 			   
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/9/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/Logan.jpg",
			 			   nombre: "Logan",
			 			   descripcion: "Vuelve de nuevo a la acción",
			 			   genero: "Acción",
						   duracion: "80",
						   tituloOriginal: "Logan",
						   director: "John Will",
						   calificacion: "+16"},			 	
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Subtitulado",
				dia: new Date("5/10/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/America.jpg",
			 			   nombre: "Capitán América",
			 			   descripcion: "El héroe de Estados Unidos",
			 			   genero: "Acción",
						   duracion: "76",
						   tituloOriginal: "Captain America",
						   director: "Mary Weild",
						   calificacion: "+13"},			 	
				formato: "3D",
				complejo: {
						   nombre: "Cinemar Avellaneda"
						  },
				idioma: "Español",
				dia: new Date("5/10/2017")
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
			 			   nombre: "Bella y Bestia",
			 			   descripcion: "Un romance diferente",
			 			   genero: "Romance",
						   duracion: "71",
						   tituloOriginal: "Beauty And The Beast",
						   director: "Taliz Al Quilani",
						   calificacion: "ATP"},							 			   
				formato: "2D",
				complejo: {
						   nombre: "Cinemar Lanus"
						  },
				idioma: "Español",
				dia: new Date("5/11/2017")
			}
		];

		(function(){			
			var funcionesConTime = $scope.funciones;
			for (var i = funcionesConTime.length - 1; i >= 0; i--) {				
				funcionesConTime[i].diaTime = funcionesConTime[i].dia.getTime();				
			}
			console.log($scope.funciones);
			console.log(funcionesConTime);			
		})();
		
		Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
   		}

   		function getDates(startDate, stopDate) {
      	var dateArray = new Array();
      	var currentDate = startDate;
      	while (currentDate <= stopDate) {
        	dateArray.push(currentDate)
        	currentDate = currentDate.addDays(1);
      	}
      	return dateArray;
    	}

		$scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
		var hoy = new Date();
		hoy.setHours(0,0,0,0);
		var proxSem = (new Date()).addDays(6);
		proxSem.setHours(0,0,0,0);
				
		$scope.fechas = getDates(hoy,proxSem);
		$scope.fechasDias = [];

		(function (){							
			for (var i = 0; i < $scope.fechas.length; i++ ) {	   
       		  $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()]);    
			}						
		})();  
				
		$scope.filtrarDia = function(){		
			console.log($scope.filtro);
				
			var indice = $scope.fechasDias.indexOf($scope.filtro.diaNombre);			
			var dia = $scope.fechas[indice];
			
			$scope.filtro.diaLocale = dia.getTime();					
		}
				
		$scope.limpiarFiltro = function (){
			console.log($rootScope);
			$scope.filtro = {};			
		}

		if(Datos.listado() != null){
			$scope.filtro = Datos.listado();
			$scope.filtro.diaNombre = $scope.dias[$scope.filtro.dia.getDay()];
		}
		
		$scope.tab = 1;

        $scope.setTab = function (tabId) {
        	console.log("seetTab");
            $scope.tab = tabId;
        };

        $scope.isSet = function (tabId) {
        	console.log($scope.tab);
        	console.log(tabId);
            return $scope.tab === tabId;
        };
    }])
})();