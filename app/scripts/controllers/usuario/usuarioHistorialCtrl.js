(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioHistorialCtrl', ['$rootScope','$scope','Usuarios','Operaciones','Datos',function($rootScope,$scope,Usuarios,Operaciones,Datos){	
       
        Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
        .then(function(datos){
            $scope.usuario=datos[0]; 
            console.log($scope.usuario);

             Operaciones.operacionPorCodigoUser($scope.usuario._id)
            .then(function(datos){
            $scope.operaciones=datos; 
            console.log($scope.operaciones);

            //Operaciones No retiradas (estado == Reservado && fechaActual > funcion.hora+30' )
            $scope.noRetiradas = $scope.operaciones.filter(function(element){
          //  return (element._id === $scope.slide.pelicula._id);
            });

            //Operaciones Reservas (estado == Reservado && fechaActual <= funcion.hora+30' )
            $scope.reservas = $scope.operaciones.filter(function(element){
          //  return (element._id === $scope.slide.pelicula._id);
            });

            //Operaciones Compras (estado == Pagado)
            $scope.compras = $scope.operaciones.filter(function(element){
          //  return (element._id === $scope.slide.pelicula._id);
            });

            //Operaciones Retiradas (estado == Retirado)
            $scope.retiradas = $scope.operaciones.filter(function(element){
          //  return (element._id === $scope.slide.pelicula._id);
            });


        })
        .catch(function(e){
            console.log(e);
        });   
        })
        .catch(function(e){
            console.log(e);
        });     
	 
    }])
})();