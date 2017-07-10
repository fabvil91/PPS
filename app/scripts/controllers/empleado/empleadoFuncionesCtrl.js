(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesCtrl', ['$rootScope','$scope','Datos','$sce','Funciones','$timeout','$location','$state','$window',
    function($rootScope,$scope,Datos,$sce,Funciones,$timeout,$location,$state,$window){
	  $scope.reloadPage = function(){$window.location.reload();}
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

        //Buscamos las funciones del complejo del empleado                
        $scope.funciones = $scope.funciones.filter(function(element){
                                 return (element.complejo.nombre == $rootScope.globals.currentUser.complejo.nombre);
                              });
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
    $timeout(list, 200);
    
   	 $scope.borrar = function borrar(item) {
      console.log(item);
      var funcionesABorrar = [];

      for (var i = 0; i < item.length; i++) {        
        if(new Date().getTime() <= addMinutes(new Date(item[i].fechaCreacion),1).getTime()) {

          var funcion = $scope.funciones.filter(function(element){
          return (element._id === item[i]._id);
          });             
          funcion = funcion[0];          
          funcionesABorrar.push(funcion);
         
        }else{          
          funcionesABorrar = [];
          alert("Ya no es posible eliminar las funciones");
          break;
        }
      }

      console.log(funcionesABorrar);
      for (var i = 0; i < funcionesABorrar.length; i++) {
           Funciones.borrar(funcionesABorrar[i])
           .then(function(datos){
            console.log(datos);

            //var pos = $scope.funciones.indexOf(funcionesABorrar[i]);
            //$scope.funciones.splice(pos, 1);
           })
           .catch(function(e){
             console.log(e);
           });
      }
      $timeout($scope.reloadPage, 200);   
    }

    $scope.formatear = function(funcion){         
          return funcion.replace(/,/g, " > ");
    }

    $scope.formatearHora = function(funcion){          
      var fecha = new Date(funcion.hora);
      return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes() < 10? "0"+fecha.getMinutes() : fecha.getMinutes());
    } 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoFuncionesForm');
    }	
   	       		         	         
    }])
})();