(function(){
	'use strict';
	angular.module('cine')
	.controller('adminCinesFormCtrl', ['$rootScope','$scope','Datos','$sce','Complejos','$location',function($rootScope,$scope,Datos,$sce,Complejos,$location){									
    $scope.complejo = {};
	$scope.horaApertura;
	$scope.horaCierre;

       	    if(Datos.listado() == null){
	     console.log('alta ' + Datos.listado());$scope.cargar = cargar;
	    	    	  	     
	     function cargar() { 
		
			$scope.complejo.horaCierre=formatearHora($scope.horaCierre);
			$scope.complejo.horaApertura=formatearHora($scope.horaApertura);

	       Complejos.alta($scope.complejo)
	       .then(function(datos){
	        console.log(datos);			
	    	$location.path('adminCines');
	       })
	       .catch(function(e){
	        console.log(e);
	       });
	     }}

	   else{
		    console.log('modificar' + Datos.listado());  
		    $scope.cargar = cargar;
			$scope.complejo=Datos.listado();

			 var f = new Date($scope.complejo.horaApertura);
			 var hora="";
			 var min=""
			if(f.getHours()>9){        
				hora = f.getHours();
			}else{
				hora = "0" + f.getHours();
			}
			if(f.getMinutes()>9){
				min =f.getMinutes();
			}
			else{
				min = "0"+ f.getMinutes();
			}
		     $scope.horaApertura=(hora+":"+min);

			 var f = new Date($scope.complejo.horaCierre);
			 var hora="";
			 var min=""
			if(f.getHours()>9){        
				hora = f.getHours();
			}else{
				hora = "0" + f.getHours();
			}
			if(f.getMinutes()>9){
				min =f.getMinutes();
			}
			else{
				min = "0"+ f.getMinutes();
			}
		     $scope.horaCierre=(hora+":"+min);

		    function cargar() {
				$scope.complejo.horaCierre=formatearHora($scope.horaCierre);
			$scope.complejo.horaApertura=formatearHora($scope.horaApertura);
		   
		       Complejos.modificar($scope.complejo)
		        .then(function(datos){
		         console.log(datos);
		        $location.path('adminCines');
		        })
		        .catch(function(e){
		         console.log(e);
		       });

		       Datos.limpiar(); 
		    }
	   }

	   var formatearHora=function(input){
	 		var da = new Date();
			 var hora = input.slice(0,2);
			var minutos =input.slice(3,5);
			if(hora.slice(0,1)==0){
				hora=hora.slice(1,2);
			}
			if(minutos.slice(0,1)==0){
				minutos=minutos.slice(1,2);
			}
			da.setHours(hora,minutos,"00");
			return da;
	   }


	}])
	   
})();



