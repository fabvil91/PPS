(function(){
	'use strict';
	angular.module('cine', ['ui.bootstrap','ui.router','ngCookies','angular.filter'])
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
    $urlRouterProvider.otherwise('main');           
  })
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
            $rootScope.$emit('myOwnEvent', $rootScope.globals.currentUser.username);}
          //  if (restrictedPage && !loggedIn) {
          //      $location.path('/login');
          //  }
        });
    }])
    
})();