(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('cajeroBuscarCodigoCtrl', ['$scope','$location','Operaciones','Datos','$rootScope','Tarjetas','Bancos','Promociones',
        function ($scope,$location,Operaciones,Datos,$rootScope,Tarjetas,Bancos,Promociones) {
                $scope.codigo = null;
                $scope.operacion = null;                
                $scope.funcion = Datos.listado();
            
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

                                          /*  $scope.funcion.operacion = {
                                                vencimiento:{}
                                            };*/

                                          /*  $scope.hayPromo = false;
                                            for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                                                if($scope.funcion.entradas[i].promocion && $scope.funcion.entradas[i].cantidad > 0){
                                                    $scope.hayPromo = true;
                                                    break;
                                                }
                                            }
                                            console.log($scope.hayPromo);*/
                                
            $scope.cargar = function(){                
               // console.log($scope.tipoOperacion);        	
               // Datos.cargar(funcion);
        	   }	

             $scope.buscar = function(codigo){
              Operaciones.operacionPorCodigo(codigo)
             .then(function(datos){
              console.log(datos);
                $scope.operacion = datos[0];

                $scope.formatearHora = function(funcion){          
                var fecha = new Date(funcion.hora);
                 return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
                }

                 })
                .catch(function(e){
                  console.log(e);
                });            
           }

            
         
        }]) 
})();

