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
                $scope.promociones = [
                    {
                        nombre:"Sin Promocion", id:0,
                        banco:"Galicia",
                        tarjeta:"Visa"
                    },
                    {
                        nombre:"2X1",
                        banco:"Galicia",
                        tarjeta:"Visa"
                    },
                    {
                        nombre:"30% de Descuento comprando 1 entrada",
                        banco:"Galicia",
                        tarjeta:"MasterCard"
                    },
                    {
                        nombre:"50% de Descuento comprando 2 entradas",
                        banco:"Santander Rio",
                        tarjeta:"MasterCard"
                    },
                    {
                        nombre:"4x2 comprando 4 entradas pagan 2",
                        banco:"Santander Rio",
                        tarjeta:"Visa"
                    },
                    {
                        nombre:"2x1 tarjeta de credito De cualquier banco",
                        banco:"Santander Rio",
                        tarjeta:"MasterCard"
                    },
                    {
                        nombre:"40% de Descuento comprando 3 entradas",                        
                        banco:"Santander Rio",
                        tarjeta:"MasterCard"
                    }
                    
                ];
                $scope.mes = [
                    {nombre:"Enero", id:0},
                    {nombre:"Febrero"},
                    {nombre:"Marzo"},
                    {nombre:"Abril"},
                    {nombre:"Marzo"},
                    {nombre:"Abril"},
                    {nombre:"Mayo"},
                    {nombre:"Junio"},
                    {nombre:"Julio"},
                    {nombre:"Agosto"},
                    {nombre:"Septiembre"},
                    {nombre:"Octubre"},
                    {nombre:"Noviembre"},
                    {nombre:"Diciembre"}
                 ];
                $scope.year = [
                    {nombre:"2017", id:0},
                    {nombre:"2018"},
                    {nombre:"2019"},
                    {nombre:"2020"},
                    {nombre:"2021"},
                    {nombre:"2022"},
                    {nombre:"2023"},
                    {nombre:"2024"}
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

