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
                    var promo = null;
                    for (var i = $scope.operacion.entradas.length - 1; i >= 0; i--) {
                        if($scope.operacion.entradas[i].promocion){
                           promo = $scope.operacion.entradas[i].promocion;
                           break;
                        }
                    }

                    if(promo){
                      console.log("promo del dia");
                      promo = promo;
                    }else{
                      if($scope.operacion.funcion.operacion && $scope.operacion.funcion.operacion.promociones){
                        console.log("promo de tarjeta/Banco");
                        promo = $scope.operacion.funcion.operacion.promociones;
                      }else{
                        console.log("sin promos");
                        promo = null;
                      }
                    }

                    var operacion = {};
                                         
                   if(tipo == 'efectivo'){
                     operacion = {  
                      _id: $scope.operacion._id,                
                      estado: "Retirado",                                    
                      tipoPago: "Efectivo",                                                     
                      fechaOperacion: new Date(),                    
                      promocion: promo }

                      Operaciones.modificarEfectivo(operacion)
                     .then(function(datos){
                      console.log(datos);         
                     })
                     .catch(function(e){
                      console.log(e);
                     }); 

                   }else if(tipo == 'tarjeta'){
                      operacion = {   
                      _id: $scope.operacion._id,               
                      estado: "Retirado",                 
                      tipoPago: $scope.operacion.tipo == 'credito' ? 'Credito' : 'Debito',
                      nombreTitular: $scope.operacion.funcion.operacion.titular,
                      dniTitular: $scope.operacion.funcion.operacion.dni,
                      nroTarjeta: $scope.operacion.funcion.operacion.nroTarjeta,
                      codigoSeguridad: $scope.operacion.funcion.operacion.codigoSeguridad,
                      fechaVencimiento: $scope.operacion.funcion.operacion.vencimiento,
                      tarjeta: $scope.operacion.funcion.operacion.tarjeta,
                      banco: $scope.operacion.funcion.operacion.banco,
                      fechaOperacion: new Date(),                  
                      promocion: promo }

                     Operaciones.modificarTarjeta(operacion)
                     .then(function(datos){
                      console.log(datos);         
                     })
                     .catch(function(e){
                      console.log(e);
                     }); 

                   }else if(tipo == 'compra'){
                     operacion = {
                      _id: $scope.operacion._id,                  
                      estado: "Retirado",                                                       
                      fechaOperacion: new Date()                  
                       }

                      Operaciones.modificarCompra(operacion)
                     .then(function(datos){
                      console.log(datos);         
                     })
                     .catch(function(e){
                      console.log(e);
                     });   
                   }
                   console.log(operacion);
                  }

               $scope.buscar = function(codigo){

                Operaciones.operacionPorCodigo(codigo)
                .then(function(datos){
                  console.log(datos);
                  if(datos.length != 0){
                    if(datos[0].estado == 'Pagado' || datos[0].estado == 'Reservado'){
                       $scope.errorEstado = false;
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
                      console.log(datos[0].estado);
                      $scope.errorEstado = true;
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