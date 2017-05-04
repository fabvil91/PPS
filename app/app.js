(function(){
	'use strict';
	angular.module('cine', ['ui.bootstrap','ui.router'])
	.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('main',
        {
        url:'/main',              
        controller: 'mainCtrl',
        templateUrl:'main.html'
        })
    $stateProvider
      .state('login',
        {
        url:'/login',
        controller: 'LoginCtrl',
        templateUrl:'login.html'
        })/*
    $stateProvider
      .state('consultas',
        {
        url:'/consultas',        
        controller: 'CalculosCtrl',
        templateUrl:'views/calculos.html'        
        }) */
    $urlRouterProvider.otherwise('main');           
  });
})();