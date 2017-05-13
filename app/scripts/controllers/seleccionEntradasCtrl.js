(function(){
	'use strict';
	angular.module('cine')
	.controller('seleccionEntradasCtrl', ['$rootScope','$scope','Datos','$sce','Salas',function($rootScope,$scope,Datos,$sce,Salas){	
		$scope.complejos = ["Cinemar Avellaneda", "Cinemar Lanus"];
		$scope.formatos = ["2D","3D"];
		$scope.idiomas = ["Español", "Subtitulado"];

		$scope.filtro = {};

		$scope.funciones = [
			{
				pelicula: {imageUrl: "images/peliculas/StarWars.jpg",
						   trailerUrl: "https://www.youtube.com/embed/sGbxmsDFVnE",
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
				dia: new Date("5/12/2017"),
				hora: new Date(2017,4,12,15,10,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/Logan.jpg",
						   trailerUrl: "https://www.youtube.com/embed/Div0iP65aZo",
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
				dia: new Date("5/12/2017"),
				hora: new Date(2017,4,12,16,30,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/America.jpg",
						   trailerUrl: "https://www.youtube.com/embed/uVdV-lxRPFo",
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
				dia: new Date("5/13/2017"),
				hora: new Date(2017,4,13,18,0,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
						   trailerUrl: "https://www.youtube.com/embed/SqQvZ_VUtg8",
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
				dia: new Date("5/14/2017"),
				hora: new Date(2017,4,14,10,0,0,0)
			},
			{
				pelicula: {imageUrl: "images/peliculas/BeautyAndTheBeast.jpg",
						   trailerUrl: "https://www.youtube.com/embed/SqQvZ_VUtg8",
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
				dia: new Date("5/14/2017"),
				hora: new Date(2017,4,14,16,30,0,0)
			}
		];
    }])
})();