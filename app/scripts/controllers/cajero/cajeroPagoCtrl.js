(function () { 
    'use strict';
 
    angular
        .module('cine')
        .controller('cajeroPagoCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Promociones',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Promociones) {
              
    
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

                                               $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                                                $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];

                                            $scope.funcion = Datos.listado();
                                            $scope.funcion.operacion = {
                                                tipoPago:''
                                            };
                                            $scope.hayPromo = false;
                                            if($scope.funcion.promocion!=null && $scope.funcion.promocion.tipoPromocion=="Dia"){
                                                    $scope.hayPromo=true;
                                            }
                                            console.log($scope.hayPromo);
                                              $scope.calcularDescuento=function(funcion){
                                                    if($scope.hayPromo==false){
                                                        
                                                        //Promociones Porcentaje
                                                        if(funcion.operacion.promociones.tipoDescuento=="Porcentaje"){ 
                                                            console.log("Porcentaje");
                                                            //aplica descuento a valor de entrada
                                                            //Por cada entrada se fija si coincide el tipo de entrada, o si la promocion aplica a Todas                           
                                                                funcion.entradas.forEach(function(element) {

                                                                    if(element.tipo==funcion.operacion.promociones.tipoEntrada || funcion.operacion.promociones.tipoEntrada=="Todas"){
                                                                        element.monto=element.monto-element.monto*(funcion.operacion.promociones.porcentaje/100);
                                                                        element.subtotal=element.monto*element.cantidad;
                                                                        console.log(element.subtotal);
                                                                    }                                    
                                                                });  

                                                        }
                                                        //Promociones 2x1
                                                        if(funcion.operacion.promociones.tipoDescuento=="2x1"){
                                                            funcion.entradas.forEach(function(element) {
                                                                    if(element.tipo==funcion.operacion.promociones.tipoEntrada || funcion.operacion.promociones.tipoEntrada=="Todas"){
                                                                        if(element.cantidad!=1){
                                                                            if(element.cantidad%2==0){
                                                                                console.log("PAR");
                                                                                element.subtotal=element.subtotal/2;
                                                                            }else{
                                                                                console.log("IMPAR");
                                                                                element.subtotal=element.subtotal-element.monto;
                                                                                element.subtotal=(element.subtotal/2)+element.monto;
                                                                            }
                                                                        }
                                                                    }
                                                            });
                                                        }

                                                        //recalcula precioTotal
                                                        funcion.precioTotal=0;
                                                        funcion.entradas.forEach(function(element) {
                                                            funcion.precioTotal=funcion.precioTotal+element.subtotal;
                                                        });
                                                        

                                                    }

                                            var entradas = [];
                                                for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                                                    if($scope.funcion.entradas[i].cantidad > 0){
                                                        entradas.push($scope.funcion.entradas[i]);
                                                    }
                                                }
                                            $scope.funcion.entradas = entradas; 
                                            console.log($scope.funcion.entradas);   
                                              }                                        
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
                //SI es efectivo, limpiar funcion.operacion (Solo se llena con pago en tarjeta)   
                    $scope.calcularDescuento(funcion);            
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	   }	 

              $scope.formatearEntrada = function(entrada){                          
                  return entrada.tipo + " - " + entrada.monto + " - " + entrada.cantidad;
               }

              
        }]) 
})();