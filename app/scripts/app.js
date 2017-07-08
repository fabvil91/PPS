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
      .state('olvidoContrasenia',
        {
        url:'/olvidoContrasenia',
        controller: 'olvidoContraseniaCtrl',
        templateUrl:'views/flujoPrincipal/olvidoContrasenia.html'
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
      //  controller: 'cajeroMainCtrl',
        templateUrl:'views/cajero/cajeroMain.html'
        })
      $stateProvider
        .state('cajeroCuenta',
        {
        url:'/cajeroCuenta',              
        controller: 'cajeroCuentaCtrl',
        templateUrl:'views/cajero/cajeroCuenta.html'
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
      $stateProvider
        .state('cajeroTicket',
        {
        url:'/cajeroTicket',              
        controller: 'cajeroTicketCtrl',
        templateUrl:'views/cajero/cajeroTicket.html'
      }) 
      $stateProvider
        .state('adminBancos',
        {
        url:'/adminBancos', 
        controller: 'adminBancosCtrl',             
        templateUrl:'views/admin/adminBancos.html'
        })
      $stateProvider
        .state('adminBancosForm',
        {
        url:'/adminBancosForm', 
        controller: 'adminBancosFormCtrl',             
        templateUrl:'views/admin/adminBancosForm.html'
        })  
      $stateProvider
        .state('adminCines',
        {
        url:'/adminCines',              
        controller: 'adminCinesCtrl',
        templateUrl:'views/admin/adminCines.html'
        })
      $stateProvider
        .state('adminCinesForm',
        {
        url:'/adminCinesForm',              
        controller: 'adminCinesFormCtrl',
        templateUrl:'views/admin/adminCinesForm.html'
        })      
      $stateProvider
        .state('adminConfiguracionGeneral',
        {
        url:'/adminConfiguracionGeneral',              
        //controller: '',
        templateUrl:'views/admin/adminConfiguracionGeneral.html'
        })  
      $stateProvider
        .state('adminMain',
        {
        url:'/adminMain',              
        //controller: '',
        templateUrl:'views/admin/adminMain.html'
        })  
      $stateProvider
        .state('adminPersonal',
        {
        url:'/adminPersonal',
        controller: 'adminPersonalCtrl',              
        templateUrl:'views/admin/adminPersonal.html'
        })
      $stateProvider
        .state('adminPersonalForm',
        {
        url:'/adminPersonalForm',
        controller: 'adminPersonalFormCtrl',              
        templateUrl:'views/admin/adminPersonalForm.html'
        })      
      $stateProvider
        .state('adminPrecios',
        {
        url:'/adminPrecios',              
        controller: 'adminPreciosCtrl',
        templateUrl:'views/admin/adminPrecios.html'
        })
      $stateProvider
        .state('adminPreciosForm',
        {
        url:'/adminPreciosForm',              
        controller: 'adminPreciosFormCtrl',
        templateUrl:'views/admin/adminPreciosForm.html'
        })    
      $stateProvider
        .state('adminPromociones',
        {
        url:'/adminPromociones',              
        controller: 'adminPromocionesCtrl',
        templateUrl:'views/admin/adminPromociones.html'
        })
       $stateProvider
        .state('adminPromocionesForm',
        {
        url:'/adminPromocionesForm',              
        controller: 'adminPromocionesFormCtrl',
        templateUrl:'views/admin/adminPromocionesForm.html'
        })   
      $stateProvider
        .state('adminSalaNueva',
        {
        url:'/adminSalaNueva',              
        controller: 'adminSalaFormCtrl',
        templateUrl:'views/admin/adminSalaNueva.html'
        }) 
      $stateProvider
        .state('adminSalas',
        {
        url:'/adminSalas',              
        controller: 'adminSalasCtrl',
        templateUrl:'views/admin/adminSalas.html'
      }) 
      $stateProvider
        .state('adminCuenta',
        {
        url:'/adminCuenta',              
        controller: 'adminCuentaCtrl',
        templateUrl:'views/admin/adminCuenta.html'
        }) 
      $stateProvider
        .state('adminSlide',
        {
        url:'/adminSlide',              
        controller: 'adminSlideCtrl',
        templateUrl:'views/admin/adminSlide.html'
        }) 
       $stateProvider
        .state('adminSlideForm',
        {
        url:'/adminSlideForm',              
        controller: 'adminSlideFormCtrl',
        templateUrl:'views/admin/adminSlideForm.html'
        })   
      $stateProvider
        .state('adminTarjeta',
        {
        url:'/adminTarjeta',              
        controller: 'adminTarjetaCtrl',
        templateUrl:'views/admin/adminTarjeta.html'
        })
      $stateProvider
        .state('adminTarjetaForm',
        {
        url:'/adminTarjetaForm',              
        controller: 'adminTarjetaFormCtrl',
        templateUrl:'views/admin/adminTarjetaForm.html'
        })      
      $stateProvider
        .state('empleadoFunciones',
        {
        url:'/empleadoFunciones',              
        controller: 'empleadoFuncionesCtrl',
        templateUrl:'views/empleado/empleadoFunciones.html'
        })
      $stateProvider
        .state('empleadoFuncionesForm',
        {
        url:'/empleadoFuncionesForm',              
        controller: 'empleadoFuncionesFormCtrl',
        templateUrl:'views/empleado/empleadoFuncionesForm.html'
        })   
      $stateProvider
        .state('empleadoNotificaciones',
        {
        url:'/empleadoNotificaciones',              
        controller: 'empleadoNotificacionesCtrl',
        templateUrl:'views/empleado/empleadoNotificaciones.html'
        })  
      $stateProvider
        .state('empleadoMain',
        {
        url:'/empleadoMain',              
        //controller: 'cajeroFinalizarCtrl',
        templateUrl:'views/empleado/empleadoMain.html'
      })  
      $stateProvider
        .state('empleadoCuenta',
        {
        url:'/empleadoCuenta',              
        controller: 'empleadoCuentaCtrl',
        templateUrl:'views/empleado/empleadoCuenta.html'
        })  
      $stateProvider
        .state('empleadoPeliculas',
        {
        url:'/empleadoPeliculas',              
        //controller: 'cajeroFinalizarCtrl',
        templateUrl:'views/empleado/empleadoPeliculas.html'
        }) 
      $stateProvider
        .state('usuarioBorrar',
        {
        url:'/usuarioBorrar',              
        controller: 'usuarioBorrarCtrl',
        templateUrl:'views/usuario/usuarioBorrar.html'
        })  
      $stateProvider
        .state('usuarioCuenta',
        {
        url:'/usuarioCuenta',              
        controller: 'usuarioCuentaCtrl',
        templateUrl:'views/usuario/usuarioCuenta.html'
      })
      $stateProvider
        .state('usuarioTarjeta',
        {
        url:'/usuarioTarjeta',              
        controller: 'usuarioTarjetaCtrl',
        templateUrl:'views/usuario/usuarioTarjeta.html'
        })
      $stateProvider
        .state('usuarioFinalizarPago',
        {
        url:'/usuarioFinalizarPago',              
        controller: 'usuarioFinalizarPagoCtrl',
        templateUrl:'views/usuario/usuarioFinalizarPago.html'
        })  
      $stateProvider
        .state('usuarioHistorial',
        {
        url:'/usuarioHistorial',              
        controller: 'usuarioHistorialCtrl',
        templateUrl:'views/usuario/usuarioHistorial.html'
        })
      $stateProvider
        .state('usuarioMain',
        {
        url:'/usuarioMain',              
        //controller: 'cajeroFinalizarCtrl',
        templateUrl:'views/usuario/usuarioMain.html'
        })
      $stateProvider
        .state('usuarioReservaVencida',
        {
        url:'/usuarioReservaVencida',              
        controller: 'usuarioReservaVencidaCtrl',
        templateUrl:'views/usuario/usuarioReservaVencida.html'
      })  
      $stateProvider
        .state('usuarioImprimir',
        {
        url:'/usuarioImprimir',              
        controller: 'usuarioImprimirCtrl',
        templateUrl:'views/usuario/usuarioImprimir.html'
        })   
        
    $urlRouterProvider.otherwise(function ($injector, $location) {
        console.log("Otherwise Executed");

        try { 
          var $rootScope = $injector.get("$rootScope");
          var $state = $injector.get("$state");
          console.log($rootScope);

          if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Usuario'){
            $state.go('main');            
          } else             
          if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Admin'){
            $location.path('adminMain');             
          } else
          if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
            $location.path('empleadoMain');            
          } else
          if($rootScope.globals.currentUser && $rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
            $state.go('cajeroMain');            
          } else          
          {
            $state.go('main');            
          } 
         
        } catch (e) {
          console.log(e);
        }

    });           
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
                  '/promosVigentes','/quienesSomos','/contactanos','/prohibida', 
                  '/usuarioBorrar','/usuarioCuenta','/usuarioFinalizarPago','/usuarioHistorial','/usuarioMain','/usuarioReservaVencida','/usuarioTarjeta','/usuarioImprimir']) === -1;
              }
              //Agregar los distintos tipos de usuario
              if($rootScope.globals.currentUser.tipoUsuario == 'Admin'){
                var restrictedPage = $.inArray($location.path(), ['/adminMain', 
                '/promosVigentes','/quienesSomos','/contactanos','/prohibida',
                '/adminBancos','/adminCines','/adminCuenta','/adminConfiguracionGeneral','/adminPersonal','/adminPrecios','/adminPromociones','/adminSalaNueva','/adminSalas','/adminTarjeta','/adminSlide',
                '/adminSlideForm','/adminPromocionesForm','/adminBancosForm','/adminCinesForm','/adminPersonalForm','/adminPreciosForm','/adminTarjetaForm']) === -1;
              }

              if($rootScope.globals.currentUser.tipoUsuario == 'Empleado'){
                var restrictedPage = $.inArray($location.path(), ['/empleadoMain',
                '/promosVigentes','/quienesSomos','/contactanos','/prohibida','/empleadoCuenta',
                '/empleadoFunciones','/empleadoFuncionesForm','/empleadoNotificaciones','/empleadoPeliculas']) === -1;
              }
              
              if($rootScope.globals.currentUser.tipoUsuario == 'Cajero'){
                var restrictedPage = $.inArray($location.path(), ['/cajeroMain','/cajeroTicket', '/cajeroBuscarCodigo','/cajeroSeleccionPelicula','/cajeroEntradas','/cajeroAsientos','/cajeroPago','/cajeroFinalizar',
                  '/cajeroCuenta', '/login',
                  '/promosVigentes','/quienesSomos','/contactanos','/prohibida']) === -1;
              }
                                          
              if (restrictedPage) {                    
                  console.log("Pagina prohibida: " + $location.path());                   
                  $state.go('prohibida');                      
              }        

            }else{
              console.log('no logueado, path: ' + $location.path());
              //si no estas logeado y vas a una que no sea main,etc => // $location.path('/login');
                 var restrictedPage = $.inArray($location.path(), ['/main', '/login','/olvidoContrasenia','/registro','/promosVigentes','/quienesSomos','/contactanos','/prohibida','/detallePelicula']) === -1;
                   if (restrictedPage) {                    
                    console.log("Pagina prohibida: " + $location.path());                   
                    $state.go('login');                      
                  }  
            }
         
        });
    }])
    
})();