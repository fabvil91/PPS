(function(){
	'use strict';
	angular.module('cine')
	.controller('cajeroTicketCtrl', ['$rootScope','$scope','Datos','$window','Operaciones',function($rootScope,$scope,Datos,$window,Operaciones){	
       $scope.reloadPage = function(){$window.location.reload();}

       $scope.operacion = Datos.listado();
        console.log($scope.operacion);

        $scope.asientos = [];
        $scope.operacion.funcion.sala.asientos.forEach(function(element) {
            element.forEach(function(a){
                if(a.checked==true){
                    $scope.asientos.push(a);
                }
            });
        });
        console.log($scope.asientos);
         $scope.formatearHora = function(funcion){        	
            var fecha = new Date(funcion.hora);
            return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes());
        }

         $scope.calcularPrecio = function (entradas){
            var precio=0;
            entradas.forEach(function(element) {
            precio = precio + element.subtotal;
            });
            
            return precio;

        }
        $scope.imprimir=function(){
            $window.print();
            Datos.cargar($scope.operacion);
        }
 
	 
    }])
})();