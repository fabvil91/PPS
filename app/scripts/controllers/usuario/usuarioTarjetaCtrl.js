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
                    if(Datos.listado!=null){
                        $scope.usuario.datosTarjeta=Datos.listado;
                    }            
                            $scope.selectedMes;
                            $scope.selectedYear;

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


