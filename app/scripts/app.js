(function(){
	'use strict';
	angular.module('cine', ['ui.bootstrap','ui.router','ngCookies','angular.filter','ngSanitize'])
	.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('main',
        {
        url:'/main',              
        controller: 'mainCtrl',
        templateUrl:'views/main.html'
        })
    $stateProvider
      .state('login',
        {
        url:'/login',
        controller: 'loginCtrl',
        templateUrl:'views/login.html'
        })
    $stateProvider
      .state('registro',
        {
        url:'/registro',        
        controller: 'registroCtrl',
        templateUrl:'views/registro.html'        
        }) 
       $stateProvider
      .state('detallePelicula',
        {
        url:'/detallePelicula',              
        controller: 'detallePeliculaCtrl',
        templateUrl:'views/detallePelicula.html'
        })
      $stateProvider
      .state('salas',
        {
        url:'/salas',              
        controller: 'salasCtrl',
        templateUrl:'views/salas.html'
        })
      $stateProvider
      .state('seleccionEntradas',
        {
        url:'/seleccionEntradas',        
        controller: 'seleccionEntradasCtrl',
        templateUrl:'views/seleccionEntradas.html'        
        }) 
      $stateProvider
        .state('promosVigentes',
        {
        url:'/promosVigentes',              
        controller: 'promosVigentesCtrl',
        templateUrl:'views/promosVigentes.html'
        })
      $stateProvider
        .state('quienesSomos',
        {
        url:'/quienesSomos',        
        templateUrl:'views/quienesSomos.html'
        })
      $stateProvider
        .state('contactanos',
        {
        url:'/contactanos',              
        controller: 'contactanosCtrl',
        templateUrl:'views/contactanos.html'
      })
      $stateProvider
        .state('finalizarOperacion',
        {
        url:'/finalizarOperacion',              
        controller: 'finalizarOperacionCtrl',
        templateUrl:'views/finalizarOperacion.html'
        })
      $stateProvider
        .state('datosOperacionCompra',
        {
        url:'/datosOperacionCompra',              
        controller: 'datosOperacionCompraCtrl',
        templateUrl:'views/datosOperacionCompra.html'
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
  .run(['$rootScope', '$location', '$cookies', '$http',
    function run($rootScope, $location, $cookies, $http) {
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
                var restrictedPage = $.inArray($location.path(), ['/main', '/login','/registro','/detallePelicula','/salas','/seleccionEntradas','/promosVigentes','/quienesSomos']) === -1;
              }
              //Agregar los distintos tipos de usuario
              if (restrictedPage) {
                console.log("Pagina prohibida" + $location.path());
               // $location.path('/login'); o Pagina de error?
              }              
            }else{
              //si no estas logeado y vas a una que no sea main => // $location.path('/login');
            }
         
        });
    }])
    
})();