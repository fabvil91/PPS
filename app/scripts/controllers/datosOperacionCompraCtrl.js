(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('datosOperacionCompraCtrl', ['$scope','$location','Datos','UserService','$rootScope',
        function ($scope,$location,Datos,UserService,$rootScope,) {
        
                $scope.funcion = Datos.listado();
                $scope.tarjetas = [
                    {nombre:"Visa", id:1},
                    {nombre:"MasterCard", id:2},
                    {nombre:"American Express", id:0}
                ];

                $scope.bancos = [
                    {nombre:"Galicia", id:0},
                    {nombre:"Santander Rio"},
                    {nombre:"Banco Macro"},
                    {nombre:"Banco Ciudad"},
                    {nombre:"HSBC"},
                    {nombre:"Banco Patagonia"},
                    {nombre:"Superville"}
                ];
                $scope.funcion.operacion = {
                    vencimiento:{}
                };
                $scope.cargar = function(funcion){                
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	 }	 
        } ]) 
})();

