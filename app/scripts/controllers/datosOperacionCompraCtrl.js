(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('datosOperacionCompraCtrl', ['$scope','$location','Datos','$rootScope','Tarjetas','Bancos','Promociones','Usuarios',
        function ($scope,$location,Datos,$rootScope,Tarjetas,Bancos,Promociones,Usuarios) {
        
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

                                    Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                                    .then(function(datos){
                                        $scope.usuario=datos[0];
                                        console.log("root user:");
                                        console.log($scope.usuario);

                                        Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                                        .then(function(datos){
                                            $scope.usuario=datos[0];
                                            console.log("actual user:");
                                            console.log($scope.usuario);

                                            $scope.promociones = $scope.promociones.filter(function(element){
                                                return (element.tipoPromocion=="Tarjeta");
                                            });
                                            console.log($scope.promociones);

                                                $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                                                $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];

                                                $scope.funcion.operacion = {
                                                    vencimiento:{}
                                                };
                                                $scope.hayPromo = false;
                                                /*
                                                for (var i = $scope.funcion.entradas.length - 1; i >= 0; i--) {
                                                    if($scope.funcion.entradas[i].promocion && $scope.funcion.entradas[i].cantidad > 0){
                                                        $scope.hayPromo = true;
                                                        break;
                                                    }
                                                }*/
                                                if($scope.funcion.promocion!=null && $scope.funcion.promocion.tipoPromocion=="Dia"){
                                                    $scope.hayPromo=true;
                                                }
                                                console.log($scope.hayPromo);

                                                if($scope.usuario.datosTarjeta!=null){                                        
                                            
                                                    $scope.funcion.operacion.codigoSeguridad=$scope.usuario.datosTarjeta.codigoSeguridad;
                                                    $scope.funcion.operacion.dniTitular=$scope.usuario.datosTarjeta.dni;
                                                    $scope.funcion.operacion.fechaVencimiento=$scope.usuario.datosTarjeta.vencimiento;
                                                    $scope.funcion.operacion.nombreTitular=$scope.usuario.datosTarjeta.titular;
                                                    $scope.funcion.operacion.nroTarjeta=$scope.usuario.datosTarjeta.numeroTarjeta;

                                                    var banco = $scope.bancos.filter(function(element){
                                                    return (element._id === $scope.usuario.datosTarjeta.banco._id);
                                                    });
                                                    $scope.funcion.operacion.banco=banco[0];
                                                    var tarjeta = $scope.tarjetas.filter(function(element){
                                                    return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                                                    });
                                                    $scope.funcion.operacion.tarjeta=tarjeta[0];                                          
                                            
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
                 })
                    .catch(function(e){
                    console.log(e);
                })
                })
                    .catch(function(e){
                    console.log(e);
                })
                $scope.calcularDescuento=function(funcion){
                    if(funcion.operacion.promociones!="Sin Promocion"){
                        
                        //Promociones Porcentaje
                        if(funcion.operacion.promociones.tipoDescuento=="Porcentaje"){ 
                            //aplica descuento a valor de entrada
                            //Por cada entrada se fija si coincide el tipo de entrada, o si la promocion aplica a Todas                           
                                funcion.entradas.forEach(function(element) {
                                    if(element.tipo==funcion.operacion.promociones.tipoEntrada || funcion.operacion.promociones.tipoEntrada=="Todas"){
                                        element.monto=element.monto*(funcion.operacion.promociones.porcentaje/100);
                                        element.subtotal=element.monto*element.cantidad;
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
                $scope.cargar = function(funcion){ 
                    $scope.calcularDescuento(funcion);               
                    console.log(funcion);        	
                    Datos.cargar(funcion);
        	   }	 
        } ]) 
})();

