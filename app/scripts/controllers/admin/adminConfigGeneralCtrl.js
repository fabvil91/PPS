(function(){
	'use strict';
	angular.module('cine')
	.controller('adminConfiguracionGeneralCtrl', ['$rootScope','$scope','$location','Constantes','Datos',function($rootScope,$scope,$location,Constantes,Datos){	                                       
            Constantes.listado()
           .then(function(datos){
            console.log(datos);
              $scope.constantes = datos[0];
           })
           .catch(function(e){
             console.log(e);
           })

            $scope.modificar = function(){
                 Constantes.modificar($scope.constantes)
                  .then(function(datos){
                   console.log(datos);         
                   $location.path('adminMain');
                  })
                  .catch(function(e){
                   console.log(e);
                 });  
            }
    }])
})();