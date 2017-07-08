(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPersonalCtrl', ['$rootScope','$scope','Datos','$sce','Usuarios','$timeout','$location',function($rootScope,$scope,Datos,$sce,Usuarios,$timeout,$location){
								       
     Datos.limpiar();

	   Usuarios.listado()
     .then(function(datos){
     	console.log(datos);

        $scope.personal=datos.filter(function(item){
          if(item.tipo.nombre=="Cajero"||item.tipo.nombre=="Empleado"){
            return item;
          }
        });


     })
     .catch(function(e){
       console.log(e);
     })

    
   	 $scope.borrar = function borrar(item) {

     Usuarios.borrar(item)
     .then(function(datos){
      console.log(item);
      var pos = $scope.personal.indexOf(item);
      $scope.personal.splice(pos, 1);
     })
     .catch(function(e){
       console.log(e);
     });
    }

    $scope.modificar = function modificar(item) {
      console.log(item);
     Datos.cargar(item);
     $location.path('adminPersonalForm');
    }	 

     $scope.alta = function altaPersonal() {      
     Datos.cargar(null);
     $location.path('adminPersonalForm');
    }	
   	       		         	         
    }])
})();