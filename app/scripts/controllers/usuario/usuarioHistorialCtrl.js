(function(){
	'use strict';
	angular.module('cine')
	.controller('usuarioHistorialCtrl', ['$rootScope','$scope','Usuarios','Operaciones','Datos',function($rootScope,$scope,Usuarios,Operaciones,Datos){	
       
        Usuarios.usuarioPorNombreUsuario($rootScope.globals.currentUser.username)
        .then(function(datos){ 
            $scope.usuario=datos[0]; 
            console.log("root user:");
            console.log($scope.usuario);


             Usuarios.usuarioPorNombreUsuario($scope.usuario.username)
              .then(function(datos){ 
                  $scope.usuario=datos[0]; 
                  console.log("actual user:");
                  console.log($scope.usuario);

                Operaciones.operacionPorCodigoUser($scope.usuario._id)
                .then(function(datos){
                $scope.operaciones=datos; 
                console.log($scope.operaciones);

                var porcentajeDeuda = 0.6; //donde lo guarda desde configuracion de administrador?

                //Operaciones No retiradas (estado == Reservado && fechaActual > funcion.hora+30' )
                $scope.noRetiradas = $scope.operaciones.filter(function(element){
                  return (element.estado === "Reservado");
                });


                //Operaciones Reservas (estado == Reservado && fechaActual <= funcion.hora+30' )
                $scope.reservas = $scope.operaciones.filter(function(element){
                  return (element.estado === "Reservado");
                });

                //Operaciones Compras (estado == Pagado)
                $scope.compras = $scope.operaciones.filter(function(element){
                  return (element.estado === "Pagado");
                });

                //Operaciones Retiradas (estado == Retirado)
                $scope.retiradas = $scope.operaciones.filter(function(element){
                  return (element.estado === "Retirado");
                });

                //Hay que calcular promociones tambien?
                $scope.calcularPrecio = function (entradas){
                  var precio=0;
                  entradas.forEach(function(element) {
                    precio = precio + element.subtotal;
                  });
                  
                  return precio;

                }

                $scope.calcularDeuda = function(entradas){
                  return $scope.calcularPrecio(entradas)*porcentajeDeuda;               
                }

                  $scope.cargar = function(datos){                                                                        
                      Datos.cargar(datos);
                  }	

                  })
        .catch(function(e){
            console.log(e);
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