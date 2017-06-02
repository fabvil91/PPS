(function(){
	'use strict';
	angular.module('cine', ['ui.bootstrap','ui.router','ngCookies','angular.filter','ngSanitize'])
	.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('main',
        {
        url:'/main',              
        controller: 'mainCtrl',
        templateUrl:'views/flujoPrincipal/main.html'
        })
    $stateProvider
      .state('login',
        {
        url:'/login',
        controller: 'loginCtrl',
        templateUrl:'views/flujoPrincipal/login.html'
        })
    $stateProvider
      .state('registro',
        {
        url:'/registro',        
        controller: 'registroCtrl',
        templateUrl:'views/flujoPrincipal/registro.html'        
        }) 
       $stateProvider
      .state('detallePelicula',
        {
        url:'/detallePelicula',              
        controller: 'detallePeliculaCtrl',
        templateUrl:'views/flujoPrincipal/detallePelicula.html'
        })
      $stateProvider
      .state('salas',
        {
        url:'/salas',              
        controller: 'salasCtrl',
        templateUrl:'views/flujoPrincipal/salas.html'
        })
      $stateProvider
      .state('seleccionEntradas',
        {
        url:'/seleccionEntradas',        
        controller: 'seleccionEntradasCtrl',
        templateUrl:'views/flujoPrincipal/seleccionEntradas.html'        
        }) 
      $stateProvider
        .state('promosVigentes',
        {
        url:'/promosVigentes',              
        controller: 'promosVigentesCtrl',
        templateUrl:'views/flujoPrincipal/promosVigentes.html'
        })
      $stateProvider
        .state('quienesSomos',
        {
        url:'/quienesSomos',        
        templateUrl:'views/flujoPrincipal/quienesSomos.html'
        })
      $stateProvider
        .state('contactanos',
        {
        url:'/contactanos',              
        controller: 'contactanosCtrl',
        templateUrl:'views/flujoPrincipal/contactanos.html'
      })
      $stateProvider
        .state('finalizarOperacion',
        {
        url:'/finalizarOperacion',              
        controller: 'finalizarOperacionCtrl',
        templateUrl:'views/flujoPrincipal/finalizarOperacion.html'
        })
      $stateProvider
        .state('datosOperacionCompra',
        {
        url:'/datosOperacionCompra',              
        controller: 'datosOperacionCompraCtrl',
        templateUrl:'views/flujoPrincipal/datosOperacionCompra.html'
        })
      $stateProvider
        .state('prohibida',
        {
        url:'/prohibida',        
        templateUrl:'views/flujoPrincipal/prohibida.html'
        })
      /* CAJERO */  
      $stateProvider
        .state('cajeroMain',
        {
        url:'/cajeroMain',              
        controller: 'cajeroMainCtrl',
        templateUrl:'views/cajero/cajeroMain.html'
        })
      $stateProvider
        .state('cajeroBuscarCodigo',
        {
        url:'/cajeroBuscarCodigo',              
        controller: 'cajeroBuscarCodigoCtrl',
        templateUrl:'views/cajero/cajeroBuscarCodigo.html'
        }) 
      $stateProvider
        .state('cajeroSeleccionPelicula',
        {
        url:'/cajeroSeleccionPelicula',              
        controller: 'cajeroSeleccionPeliculaCtrl',
        templateUrl:'views/cajero/cajeroSeleccionPelicula.html'
        }) 
      $stateProvider
        .state('cajeroEntradas',
        {
        url:'/cajeroEntradas',              
        controller: 'cajeroEntradasCtrl',
        templateUrl:'views/cajero/cajeroEntradas.html'
        }) 
      $stateProvider
        .state('cajeroAsientos',
        {
        url:'/cajeroAsientos',              
        controller: 'cajeroAsientosCtrl',
        templateUrl:'views/cajero/cajeroAsientos.html'
        }) 
      $stateProvider
        .state('cajeroPago',
        {
        url:'/cajeroPago',              
        controller: 'cajeroPagoCtrl',
        templateUrl:'views/cajero/cajeroPago.html'
        }) 
      $stateProvider
        .state('cajeroFinalizar',
        {
        url:'/cajeroFinalizar',              
        controller: 'cajeroFinalizarCtrl',
        templateUrl:'views/cajero/cajeroFinalizar.html'
        })      

    $urlRouterProvider.otherwise('main');           
  }) 
  .filter('trusted', ['$sce', function ($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
  }])
  .filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
  }])
  .run(['$rootScope', '$location', '$cookies', '$http','$state',
    function run($rootScope, $location, $cookies, $http,$state) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            console.log("refresh");
            //$rootScope.$emit('myOwnEvent', $rootScope.globals.currentUser.username);
            console.log($rootScope.globals.currentUser.username);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {                      
            // redirect to login page if not logged in and trying to access a restricted page
          //  var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            console.log(loggedIn);
            if(loggedIn){
              $rootScope.$emit('myOwnEvent', $rootScope.globals.currentUser.username);
            }

            if(loggedIn){
              if($rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
                var restrictedPage = $.inArray($location.path(), ['/main', '/login','/registro','/detallePelicula','/seleccionEntradas','/salas','/datosOperacionCompra','/finalizarOperacion',
                  '/promosVigentes','/quienesSomos','/prohibida']) === -1;
              }
              //Agregar los distintos tipos de usuario
              /*if($rootScope.globals.currentUser.tipoUsuario == 'Admin'){
                var restrictedPage = $.inArray($location.path(), ['/mainAdmin', '/login','/registro','/detallePelicula','/salas','/seleccionEntradas','/promosVigentes','/quienesSomos']) === -1;
              }

              if($rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
                var restrictedPage = $.inArray($location.path(), ['/mainEmp', '/login','/registro','/detallePelicula','/salas','/seleccionEntradas','/promosVigentes','/quienesSomos']) === -1;
              }

              if($rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
                var restrictedPage = $.inArray($location.path(), ['/mainCajero', '/login','/registro','/detallePelicula','/salas','/seleccionEntradas','/promosVigentes','/quienesSomos']) === -1;
              }*/
                                          
              if (restrictedPage) {                    
                  console.log("Pagina prohibida: " + $location.path());                   
                  $state.go('prohibida');                      
              }        

            }else{
              console.log('no logueado, path: ' + $location.path());
              //si no estas logeado y vas a una que no sea main,etc => // $location.path('/login');
                 var restrictedPage = $.inArray($location.path(), ['/main', '/login','/registro','/promosVigentes','/quienesSomos','/contactanos','/prohibida']) === -1;
                   if (restrictedPage) {                    
                    console.log("Pagina prohibida: " + $location.path());                   
                    $state.go('login');                      
                  }  
            }
         
        });
    }])
    
})();