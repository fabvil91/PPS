(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesCtrl', ['$rootScope','$scope','Datos','$sce','Funciones','$timeout','$location','$state',
    function($rootScope,$scope,Datos,$sce,Funciones,$timeout,$location,$state){
	
    function addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    }

   Datos.limpiar();

   //$state.reload();
  
  function list() {
	 Funciones.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.funciones = datos;
     })
     .catch(function(e){
       console.log(e);
     })
    }
    $timeout(list, 100);
    
   	 $scope.borrar = function borrar(item) {
      if(new Date().getTime() <= addMinutes(new Date(item.fechaCreacion),1).getTime()) {

       Funciones.borrar(item)
       .then(function(datos){
        console.log(item);
        var pos = $scope.funciones.indexOf(item);
        $scope.funciones.splice(pos, 1);
       })
       .catch(function(e){
         console.log(e);
       });
      }else{
        item.error = true;
      } 
    }

    /*$scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminSlideForm');
    }	*/ 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoFuncionesForm');
    }	
   	       		         	         
    }])
})();