(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('cajeroBuscarCodigoCtrl', ['$scope','$location','Operaciones','Datos','$rootScope','Tarjetas','Bancos','Promociones',
        function ($scope,$location,Operaciones,Datos,$rootScope,Tarjetas,Bancos,Promociones) {
                $scope.codigo = null;
                $scope.operacion = null;                
                          
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
                              
                $scope.cargar = function(tipo){                
                    console.log($scope.operacion);         
                   // Guardar en BD. SI es efectivo, limpiar funcion.operacion (Solo se llena con pago en tarjeta)
                   if(tipo == 'efectivo'){

                   }else if(tipo == 'tarjeta'){

                   }else if(tipo == 'compra'){
                    
                   }
                }   
                                
         
               $scope.buscar = function(codigo){

                Operaciones.operacionPorCodigo(codigo)
                .then(function(datos){
                  console.log(datos);
                  if(datos.length != 0){
                    $scope.error = false;
                  $scope.operacion = datos[0];

                     $scope.hayPromo = false;
                     for (var i = $scope.operacion.funcion.entradas.length - 1; i >= 0; i--) {
                      if($scope.operacion.funcion.entradas[i].promocion && $scope.operacion.funcion.entradas[i].cantidad > 0){
                         $scope.hayPromo = true;
                         break;
                       }
                      }
                      console.log($scope.hayPromo);

                      if($scope.operacion.funcion.transaccion.tipoTransaccion != 'compra'){
                        $scope.operacion.funcion.operacion = {
                            vencimiento:{}
                         };
                      }

                      $scope.formatearHora = function(funcion){          
                      var fecha = new Date(funcion.hora);
                       return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
                      }

                      $scope.formatearEntrada = function(entrada){                          
                       return entrada.tipo + " - " + entrada.monto + " - " + entrada.cantidad;
                      }

                      $scope.total = function(){  
                      var total = 0;                        
                       for (var i = $scope.operacion.funcion.entradas.length - 1; i >= 0; i--) {
                         total = total + $scope.operacion.funcion.entradas[i].subtotal;
                       }
                       return total;
                      }
                  }else{
                    console.log("nadinas");
                    $scope.error = true;
                  }
                 })
                .catch(function(e){
                  console.log(e);
                });            
           }
        }]) 
})();

