(function(){
	'use strict';
	angular.module('cine')
	.controller('salasCtrl', ['$rootScope','$scope','Datos','$sce','Salas','$timeout',function($rootScope,$scope,Datos,$sce,Salas,$timeout){	
		       
		    $scope.sala = {};
        	(function(){
        		$scope.sala = Salas.crear(10,10);
        		console.log($scope.sala);
        	})();

        	var _startCountdown = function(){
				var timerCount = 3660;

				var countDown = function () {
				if (timerCount < 0) {
				  //Any desired function upon countdown end.
				  console.log("SE TERMINO EL TIEMPO");
				} else {
				  $scope.countDownLeft = timerCount;
				  timerCount--;
				  $timeout(countDown, 1000);
				}
				};
			$scope.countDownLeft = timerCount;
			countDown();
			}
        
        _startCountdown();
    }])
})();