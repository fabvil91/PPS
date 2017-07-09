(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('detalleProximoCtrl', ['$scope','$location','Datos','$rootScope',
        function ($scope,$location,Datos,$rootScope) {
                
       $scope.pelicula=Datos.listado();
       console.log($scope.pelicula);
		           		
             $scope.panelString={nombre:"Sinopsis"};

		$scope.switch=function(v){
			console.log("BEFORE",$scope.panelString);
			if(v=="Sinopsis"){
				$scope.panelString.nombre="Ficha Técnica";
			}else{
				$scope.panelString.nombre="Sinopsis";			
			}
			
			console.log("AFTER",$scope.panelString);
		}

     }]);
})();

