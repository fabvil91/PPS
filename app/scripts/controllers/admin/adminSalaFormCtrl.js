(function(){
	'use strict';
	angular.module('cine')
	.controller('adminSalaFormCtrl', ['$rootScope','$scope','Datos','$sce','Formatos','Complejos','SalasService','Salas','$location',
    function($rootScope,$scope,Datos,$sce,Formatos,Complejos,SalasService,Salas,$location){									
        $scope.sala = {};
        $scope.cantFilas=0;
        $scope.cantColumnas=0;
        $scope.ocultarAsientos=true;
        $scope.sala.asientos={};

        $scope.generarSala=function(){
            if($scope.cantFilas>0&&$scope.cantColumnas>0){
                $scope.sala.asientos=Salas.crear($scope.cantFilas,$scope.cantColumnas);
            }
            $scope.ocultarAsientos=false;
        }

       Formatos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.formatos = datos; 
           Complejos.listado()
            .then(function(datos){
            console.log(datos);
            $scope.complejos = datos; 

           
                $scope.cargar = cargar;
                
                                    
                function cargar() { 
                    

                    var formato = $scope.formatos.filter(function(element){
                        return (element._id === $scope.sala.formato._id);
                    });
                    var complejo = $scope.complejos.filter(function(element){
                        return (element._id === $scope.sala.complejo._id);
                    });
                    $scope.sala.complejo = complejo[0];
                    $scope.sala.formato = formato[0];
                    console.log($scope.sala);
                   

                SalasService.alta($scope.sala)
                .then(function(datos){
                    console.log(datos);
                })
                .catch(function(e){
                    console.log(e);
                });
                        
                    $location.path('adminSalas');
                }

                

                $scope.seleccionar = function(columna){
                   var index = 0;
                    //busca indice de columna
                    for (var inF = 0; inF<=$scope.sala.asientos.length - 1;  inF++) {
                        for (var inC = 0; inC<= $scope.sala.asientos[inF].length - 1; inC++) {
                            if($scope.sala.asientos[inF][inC].id == columna.id){
                                index=inC+1;
                                break;
                            }
                        }
	         	    }
                     //setea pasillo:true a todos los asientos en el indice de columna
                    for (var inF = 0; inF<=$scope.sala.asientos.length - 1;  inF++) {
                        for (var inC = 0; inC<= $scope.sala.asientos[inF].length - 1; inC++) {
                            if((inC+1)==index){
                                if($scope.sala.asientos[inF][inC].pasillo==true){
                                    $scope.sala.asientos[inF][inC].pasillo=false;
                                }else{
                                    $scope.sala.asientos[inF][inC].pasillo=true;
                                }
                            }
                        }
                    }

                }
                

            })
            .catch(function(e){
                console.log(e);
            })
       })
	   .catch(function(e){
	      console.log(e);
	   })
    }])
})();


