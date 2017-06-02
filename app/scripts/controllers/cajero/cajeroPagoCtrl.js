(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('cajeroPagoCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Promociones',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Promociones) {
        
                $scope.funcion = Datos.listado();

                 Tarjetas.listado()
                     .then(function(datos){
                        console.log(datos);
                        $scope.tarjetas = datos;

                         Bancos.listado()
                         .then(function(datos){
                            console.log(datos);
                            $scope.bancos = datos;

                                 Promociones.listado()
                                 .then(function(datos){
                                    console.log(datos);
                                    $scope.promociones = datos;

                                        $scope.promociones = $scope.promociones.filter(function(element){
                                            return (element.banco != null && element.tarjeta != null);
                                        });
                                        console.log($scope.promociones);

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
                                            $scope.hayPromo = false;
                                            for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                                                if($scope.funcion.entradas[i].promocion && $scope.funcion.entradas[i].cantidad > 0){
                                                    $scope.hayPromo = true;
                                                    break;
                                                }
                                            }
                                            console.log($scope.hayPromo);
                                  })
                             .catch(function(e){
                              console.log(e);
                            })
                        })
                    .catch(function(e){
                      console.log(e);
                    })
                 })
                 .catch(function(e){
                   console.log(e);
                 })
                              
                $scope.cargar = function(funcion){                
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	   }	 
        } ]) 
})();

