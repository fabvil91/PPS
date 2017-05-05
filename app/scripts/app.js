(function(){
	'use strict';
	angular.module('cine', ['ui.bootstrap','ui.router','ngCookies'])
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
    $urlRouterProvider.otherwise('main');           
  });
})();