(function () {
    'use strict';
 
    angular
        .module('cine')
        .controller('registroCtrl', ['$scope','$location','Usuarios','TiposUsuario','$rootScope',
        function ($scope,$location,Usuarios,TiposUsuario,$rootScope) {
        
          TiposUsuario.tiposUsuarioPorNombre('Usuario')
             .then(function(datos){
                console.log(datos);
                    
              $scope.registroForm = {         
                        username: null,
                        email: null,
                        password: null,
                        tipoUsuario: datos[0],
                        datosPersonales: {}
                     };
             $scope.mensaje = null;
               
             $scope.registrar = function() {

                Usuarios.usuarioPorEmail($scope.registroForm.email)
                 .then(function(datos){
                    console.log(datos);

                    if(datos.length == 0){
                         Usuarios.Create($scope.registroForm)
                        .then(function (response) {
                        console.log(response);
                            if (response.success) {
                                $location.path('/login');
                            } else {
                                console.log("error");
                                $scope.mensaje = response.message;                       
                            }
                        });
                    }else{
                        console.log("error, mail existe");
                        $scope.mensaje = 'Ya existe un usuario con ese correo electrónico';  
                    }
                })
                .catch(function(e){
                  console.log(e);
                });
            }; 

          })
          .catch(function(e){
            console.log(e);
          })         
}]);
})();