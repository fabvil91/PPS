(function(){
	'use strict';
	angular.module('cine')
	.controller('adminCinesCtrl', ['$rootScope','$scope','Datos','$sce','Complejos','$timeout','$location',function($rootScope,$scope,Datos,$sce,Complejos,$timeout,$location){
								       
     Datos.limpiar();

	   Complejos.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.complejos = datos;
     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Complejos.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.complejos.indexOf(item);
      $scope.complejos.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminCinesForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminCinesForm');
    }	

    $scope.formatearHora=function(fecha){
      var f = new Date(fecha);
      if(f.getHours()>9){        
        var hora = f.getHours();
      }else{
        var hora = "0" + f.getHours();
      }
      if(f.getMinutes()>9){
        var min =f.getMinutes();
      }
      else{
        var min = "0"+ f.getMinutes();
      }
      

      return hora+":"+min;
    }
   	       		         	         
    }])
})();