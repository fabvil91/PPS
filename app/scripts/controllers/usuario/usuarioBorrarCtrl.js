(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioBorrarCtrl', ['$rootScope','$scope','Usuarios',function($rootScope,$scope,Usuarios){	
         Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                    .then(function(datos){
                    $scope.usuario=datos[0]; 
                    console.log($scope.usuario);
                    Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
                        .then(function(datos){ 
                            $scope.usuario=datos[0]; 
                            console.log("actual user:");
                            console.log($scope.usuario);

                            $scope.borrar=function(){
                                Usuarios.borrar($scope.usuario);
                                //como fuerzo un logOut?
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