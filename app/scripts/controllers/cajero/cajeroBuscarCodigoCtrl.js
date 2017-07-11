(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('cajeroBuscarCodigoCtrl', ['$scope','$location','Operaciones','Datos','$rootScope','Tarjetas','Bancos','Promociones',
        function ($scope,$location,Operaciones,Datos,$rootScope,Tarjetas,Bancos,Promociones) {
                $scope.codigo = null;
                $scope.operacion = null;    
                $scope.funcion=null;            
                           
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
                              
               
               $scope.buscar = function(codigo){
                function addMinutes(date, minutes) {
                    return new Date(date.getTime() + minutes*60000);
                }
                
                Operaciones.operacionPorCodigo(codigo)
                .then(function(datos){
                  console.log(datos);
                  if(datos.length != 0){
                   if(datos[0].funcion.complejo._id == $rootScope.globals.currentUser.complejo._id){
                    if(datos[0].estado == 'Pagado' || datos[0].estado == 'Reservado'){

                      if(datos[0].estado == 'Reservado' && (new Date().getTime() > (addMinutes(new Date(datos[0].funcion.hora),30).getTime())) ){
                          console.log(datos[0].estado);
                          $scope.errorEstado = true;
                          $scope.operacion = null;
                      }else{

                       $scope.errorEstado = false;
                       $scope.error = false;
                       $scope.errorComplejo = null;
                       $scope.operacion = datos[0];
                       $scope.funcion=$scope.operacion.funcion;

                     $scope.hayPromo = false;
                     if($scope.operacion.funcion.promocion!=null){
                       $scope.hayPromo=true;
                     }
 
                      console.log($scope.hayPromo);

                       
                      if($scope.funcion.transaccion.tipoTransaccion != 'compra'){
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
                      return $scope.funcion.precioTotal;
                      }

                      $scope.cargar = function(){                                                                        
                          Datos.cargar($scope.operacion);
                      }
                     }
                    }else{
                      console.log(datos[0].estado);
                      $scope.errorEstado = true;
                      $scope.operacion = null;
                    }
                   }else{
                    console.log(datos[0].funcion.complejo.nombre);
                    $scope.errorComplejo = datos[0].funcion.complejo.nombre;
                    $scope.operacion = null;
                   } 
                  }else{
                    console.log("nadinas");
                    $scope.error = true;
                    $scope.operacion = null;
                  }
                 })
                .catch(function(e){
                  console.log(e);
                });            
           }

           $scope.reg=function(stri){
             console.log("CARGAR");
              if(stri=='tarjeta'){
                console.log("TARJETA");
                if($scope.funcion.operacion.promociones!=null){                  
                  $scope.operacion.promociones=$scope.funcion.operacion.promociones;
                  $scope.calcularDescuento($scope.funcion);
                }
                $scope.operacion.funcion=$scope.funcion;

               $scope.operacion.banco=$scope.funcion.operacion.banco;
                $scope.operacion.codigoSeguridad=$scope.funcion.operacion.codigoSeguridad;
                $scope.operacion.dniTitular=$scope.funcion.operacion.dniTitular;
                $scope.operacion.fechaVencimiento=$scope.funcion.operacion.fechaVencimiento;
                $scope.operacion.nombreTitular=$scope.funcion.operacion.nombreTitular;
                $scope.operacion.nroTarjeta=$scope.funcion.operacion.nroTarjeta;
                
               
                $scope.operacion.tarjeta=$scope.funcion.operacion.tarjeta;

                $scope.operacion.estado="Retirado";
                console.log($scope.operacion);
                Operaciones.modificarTarjeta($scope.operacion)
                .then(function(datos){})
                .catch(function(e){
                  console.log(e);
                });  
                Datos.cargar($scope.operacion);
              }
              if(stri == 'compra'){
                $scope.operacion.funcion=$scope.funcion;
                 $scope.operacion.banco=$scope.funcion.operacion.banco;
                $scope.operacion.codigoSeguridad=$scope.funcion.operacion.codigoSeguridad;
                $scope.operacion.dniTitular=$scope.funcion.operacion.dniTitular;
                $scope.operacion.fechaVencimiento=$scope.funcion.operacion.fechaVencimiento;
                $scope.operacion.nombreTitular=$scope.funcion.operacion.nombreTitular;
                $scope.operacion.nroTarjeta=$scope.funcion.operacion.nroTarjeta;
 
                if($scope.funcion.operacion.promociones!=null){                  
                  $scope.operacion.promociones=$scope.funcion.operacion.promociones;
                }               
               
                $scope.operacion.tarjeta=$scope.funcion.operacion.tarjeta;
                
                $scope.operacion.estado="Retirado";
                Operaciones.modificarCompra($scope.operacion)
                .then(function(datos){})
                .catch(function(e){
                  console.log(e);
                });  
                Datos.cargar($scope.operacion);

              }
              if(stri == 'efectivo'){
                 $scope.operacion.estado="Retirado";
                   $scope.operacion.funcion=$scope.funcion;
                  if($scope.funcion.operacion.promociones!=null){                  
                  $scope.operacion.promociones=$scope.funcion.operacion.promociones;
                }
                Operaciones.modificarEfectivo($scope.operacion)
                   .then(function(datos){})
                .catch(function(e){
                  console.log(e);
                });  
                Datos.cargar($scope.operacion);


              }
           }
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
                    }
                
        }]) 
})();