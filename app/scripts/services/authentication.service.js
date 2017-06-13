(function () {
    'use strict';
 
    angular
        .module('cine')
        .factory('AuthenticationService', AuthenticationService);
 
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService','Usuarios'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService,Usuarios) {
        var service = {};
 
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
 
        return service;
 
        function Login(username, password, callback) {
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            /*    $timeout(function () {
                var response;
                UserService.GetByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = { success: true, tipoUsuario: user.tipoUsuario };
                        } else {
                            response = { success: false, message: 'Usuario o contraseña incorrectos' };
                        }
                        callback(response);
                    });
            }, 1000);*/
 
            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
		
			var response;
            Usuarios.usuarioPorNombreUsuario(username)
                .then(function (userArray) {
				var user = userArray[0];
				console.log(user);
                if (user  && user.password === password) {
					if(user.tipo.nombre=='Cajero' || user.tipo.nombre=='Empleado'){
						response = { success: true, tipoUsuario: user.tipo.nombre, complejo:user.complejo};
						console.log('good1');
					}
					if(user.tipo.nombre=='Admin'){
						response = { success: true, tipoUsuario: user.tipo.nombre};
					} 
					if(user.tipo.nombre=='Usuario'){
						response = { success: true, tipoUsuario: user.tipo.nombre, datos:{datosPersonales:user.datosPersonales,datosTarjeta:user.datosTarjeta}};
					}
                     
                 } else {
                     response = { success: false, message: 'Usuario o contraseña incorrectos' };
                 }
                     callback(response);
                });                          
        }
 
        function SetCredentials(username, password, tipoUsuario, complejo, datos) {
		if(tipoUsuario=='Cajero' || tipoUsuario=='Empleado'){
            var authdata = Base64.encode(username + ':' + password + ":" + tipoUsuario + ":" + complejo);
			console.log('good3');
            $rootScope.globals = {
                currentUser: {
                    username: username,
					tipoUsuario: tipoUsuario,
					complejo:complejo,
                    authdata: authdata
                }
            };
		 }
		if(tipoUsuario=='Admin'){
			var authdata = Base64.encode(username + ':' + password + ":" + tipoUsuario);
 
            $rootScope.globals = {
                currentUser: {
                    username: username,
					tipoUsuario: tipoUsuario,
                    authdata: authdata
                }
            };
		}
		if(tipoUsuario=='Usuario'){
			var authdata = Base64.encode(username + ':' + password + ":" + tipoUsuario + ":" + datos);
 
			if(datos.datosTarjeta!=null){
				$rootScope.globals = {
                currentUser: {
                    username: username,
					password:password,
					tipoUsuario: tipoUsuario,
					datosPersonales:{
						nombre:datos.datosPersonales.nombre,
						apellido:datos.datosPersonales.apellido,
						mail:datos.datosPersonales.mail,
						telefono:datos.datosPersonales.telefono
					},
					datosTarjeta:{
						banco:datos.datosTarjeta.banco,
						tarjeta:datos.datosTarjeta.tarjeta,
						titular:datos.datosTarjeta.titular,
						dni:datos.datosTarjeta.dni,
						codigoSeguridad:datos.datosTarjeta.codigoSeguridad,
						vencimiento:datos.datosTarjeta.vencimiento,
						numeroTarjeta:datos.datosTarjeta.numeroTarjeta
					},
                    authdata: authdata
                }
            	};
			}else{
	            $rootScope.globals = {
	                currentUser: {
	                    username: username,
						password:password,
						tipoUsuario: tipoUsuario,
						datosPersonales:{
							nombre:datos.datosPersonales.nombre,
							apellido:datos.datosPersonales.apellido,
							mail:datos.datosPersonales.mail,
							telefono:datos.datosPersonales.telefono
						},
						datosTarjeta:{
							banco:datos.datosTarjeta.banco,
							tarjeta:datos.datosTarjeta.tarjeta,
							titular:datos.datosTarjeta.titular,
							dni:datos.datosTarjeta.dni,
							codigoSeguridad:datos.datosTarjeta.codigoSeguridad,
							vencimiento:datos.datosTarjeta.vencimiento,
							numeroTarjeta:datos.datosTarjeta.numeroTarjeta
						},
	                    authdata: authdata
	                }
	            };
			}
		}
            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
 
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
			console.log($rootScope.globals);
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }
 
    // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
 
})();