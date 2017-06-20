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
                   }; 

            })
             .catch(function(e){
               console.log(e);
             })

         
}]);
}) ();

