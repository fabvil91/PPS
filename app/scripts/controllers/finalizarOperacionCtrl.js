(function(){
	'use strict';
	angular
	.module('cine')
	.controller('finalizarOperacionCtrl', ['$scope','Datos', '$rootScope', '$window',
	function($scope,Datos,$rootScope,$window){		
		$scope.funcion = Datos.listado();			
		$scope.printDiv = function(divId) {
		var printContents = document.getElementById(divId).innerHTML;
		var popupWin = window.open('', '_blank', 'width=300,height=300');
		popupWin.document.open()
		popupWin.document.write('<html><head></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
		} 
	}])
})();

