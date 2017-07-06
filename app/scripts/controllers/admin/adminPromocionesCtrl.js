(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPromocionesCtrl', ['$rootScope','$scope','Datos','$sce','Promociones','$timeout','$location','$window',
  function($rootScope,$scope,Datos,$sce,Promociones,$timeout,$location,$window){
								       
     Datos.limpiar();
     var dia = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
     

	   Promociones.listado()
     .then(function(datos){
     	console.log(datos);
        $scope.promociones = datos;
        $scope.promocionesDia=$scope.promociones.filter(function(item){
          return item.tipoPromocion=="Dia";
        });
        $scope.promocionesTarjeta=$scope.promociones.filter(function(item){
          return item.tipoPromocion=="Tarjeta";
        });

     })
     .catch(function(e){
       console.log(e);
     })
     
     $scope.formatearDia=function(num){
       var ret="";
      dia.forEach(function(item,index){
        
        if((index+1)==num){
          ret= item;
        }
      });
      return ret;
     }
    
   	 $scope.borrar = function borrar(item) {

     Promociones.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.promociones.indexOf(item);
      $scope.promociones.splice(pos, 1);
      $window.location.reload();
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPromocionesForm');
    }	 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('adminPromocionesForm');
    }	
   	       		         	         
    }])
})();