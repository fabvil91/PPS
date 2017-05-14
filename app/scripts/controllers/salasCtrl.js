(function(){
	'use strict';
	angular.module('cine')
	.controller('salasCtrl', ['$rootScope','$scope','Datos','$sce','Salas',function($rootScope,$scope,Datos,$sce,Salas){	
		       
		    $scope.sala = {};
        	(function(){
        		$scope.sala = Salas.crear(5,5);
        		console.log($scope.sala);
        	})();
        }
    ])
})();