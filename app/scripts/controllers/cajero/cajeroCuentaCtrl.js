(function(){
	'use strict';
	angular.module('cine')
	.controller('cajeroCuentaCtrl', ['$rootScope','$scope','$location','Usuarios','Datos',function($rootScope,$scope,$location,Usuarios,Datos){	

        Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
        .then(function(datos){
            $scope.usuario=datos[0]; 
            console.log($scope.usuario);

            $scope.readOnlyUsuario = true;
   
            //PERMITE EDITAR
            $scope.editar = function(editarEsto){                                   
            if(editarEsto == 'usuario'){
               $scope.readOnlyUsuario=false;
                }
            }
                                
            //HACE UPDATE EN BD
            $scope.guardar = function(seccion){
               console.log('guardar datos de ' + seccion + ' en db');
                                   
               if(seccion=='usuario'){
                   $scope.readOnlyUsuario=true;

                   Usuarios.modificar($scope.usuario)
                    .then(function (response) {
                        console.log(response.rta);
                        if (response.rta == 'OK') {
                            $location.path('/login');
                        } else {
                            console.log("error");                                            
                        }
                    });
               }
            } 

            //RECARGA DATOS                                
            $scope.cancelar = function(seccion){
               Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
                   .then(function(datosViejos){
                           if(seccion=='usuario'){
                              $scope.usuario.username = datosViejos[0].username;
                              $scope.usuario.password = datosViejos[0].password;
                              $scope.usuario.tipoUsuario=datosViejos[0].tipoUsuario;
                              $scope.readOnlyUsuario=true;
                           }
                    })
                    .catch(function(e){
                      console.log(e);
                     })
            }         
        })
        .catch(function(e){
            console.log(e);
        });	 
    }])
})();