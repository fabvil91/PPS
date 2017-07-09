(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesCtrl', ['$rootScope','$scope','Datos','$sce','Funciones','$timeout','$location','$state',
    function($rootScope,$scope,Datos,$sce,Funciones,$timeout,$location,$state){
	 
    $scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

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
    $timeout(list, 100);
    
   	 $scope.borrar = function borrar(item) {
      console.log(item);
      for (var i = 0; i < item.length; i++) {        
        if(new Date().getTime() <= addMinutes(new Date(item[0].fechaCreacion),1).getTime()) {

         Funciones.borrar(item[0])
         .then(function(datos){
          console.log(item[0]);
          var pos = $scope.funciones.indexOf(item[0]);
          $scope.funciones.splice(pos, 1);
         })
         .catch(function(e){
           console.log(e);
         });
        }else{
          item.error = true;
          break;
        }
      }   
    }

    $scope.formatear = function(funcion){         
          return funcion.replace(/,/g, " > ");
    }

    $scope.formatearHora = function(funcion){          
      var fecha = new Date(funcion.hora);
      return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
    } 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoFuncionesForm');
    }	
   	       		         	         
    }])
})();