(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioTarjetaCtrl', ['$rootScope','$scope','Datos','Bancos','Tarjetas','Usuarios',function($rootScope,$scope,Datos,Bancos,Tarjetas,Usuarios){							
			 	
         Tarjetas.listado()
            .then(function(datos){
            console.log(datos);
            $scope.tarjetas = datos;
                Bancos.listado()
                .then(function(datos){
                console.log(datos);
                $scope.bancos = datos;
                    Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                    .then(function(datos){
                    console.log(datos);
                    $scope.usuario=datos[0];

                     $scope.mes=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre","Noviembre","Diciembre"];
                     $scope.year = ["2017","2018","2019","2020","2021","2022","2023","2024"];

                    if(Datos.listado()==null){
                        $scope.cargar = cargar;
                        console.log('alta ' + Datos.listado());
	    	    	  	     
                        function cargar() {   

                            var banco = $scope.bancos.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.banco._id);
                            });

                            $scope.usuario.datosTarjeta.banco = banco[0];

                             var tarjeta = $scope.tarjetas.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                            });

                            $scope.usuario.datosTarjeta.tarjeta = tarjeta[0];

                            Usuarios.alta($scope.usuario)
                            .then(function(datos){
                                console.log(datos);
                            })
                            .catch(function(e){
                                console.log(e);
                            });
                                        
                            $location.path('usuarioCuenta');
                        }
                    }else{
                        console.log('modificar' + Datos.listado());  
                        $scope.cargar = cargar;
                        
                        $scope.usuario.datosTarjeta = Datos.listado();

                        function cargar() {
                        
                            var banco = $scope.bancos.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.banco._id);
                            });

                            $scope.usuario.datosTarjeta.banco = banco[0];

                                var tarjeta = $scope.tarjetas.filter(function(element){
                            return (element._id === $scope.usuario.datosTarjeta.tarjeta._id);
                            });

                            $scope.usuario.datosTarjeta.tarjeta = tarjeta[0];

                            Usuarios.modificar($scope.usuario)
                            .then(function(datos){
                            console.log(datos);
                            })
                            .catch(function(e){
                            console.log(e);
                        });

                        Datos.limpiar(); 
                        
                        $location.path('usuarioCuenta');
                    }
                    }            
                           

                                 $scope.guardar = function(){
                                    Usuarios.modificarTarjeta($scope.usuario);
                                    console.log("modificacion Tarjeta");
                                    console.log($scope.usuario);
                                 }


                            })
                        })
                })
        .catch(function(e){
            console.log(e);
        })
        .catch(function(e){
        console.log(e);
    })
    .catch(function(e){
        console.log(e);
        })
						
    }])
})();


