(function(){
	'use strict';
	angular.module('cine')
	.controller('empleadoFuncionesCtrl', ['$rootScope','$scope','Datos','$sce','Funciones','$timeout','$location','$state','$window','Complejos','Formatos','Idiomas',
    function($rootScope,$scope,Datos,$sce,Funciones,$timeout,$location,$state,$window,Complejos,Formatos,Idiomas){
    $scope.filtro = {};
    $scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

	  $scope.reloadPage = function(){$window.location.reload();}
    
    function addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    }

   Datos.limpiar();
     
    Complejos.listado()
       .then(function(datos){
        console.log(datos);
          $scope.complejos = datos;

            $scope.complejos = $scope.complejos.filter(function(element){
                                 return (element.nombre == $rootScope.globals.currentUser.complejo.nombre);
                              });

          Formatos.listado()
        .then(function(datos){
          console.log(datos);
            $scope.formatos = datos;

            Idiomas.listado()
          .then(function(datos){
            console.log(datos);
              $scope.idiomas = datos;

               /* Suma dias a una fecha */
                Date.prototype.addDays = function(days) {
                  var dat = new Date(this.valueOf())
                  dat.setDate(dat.getDate() + days);
                  return dat;
                }

                /* Devuelve las fechas entre dos limites */
                function getDates(startDate, stopDate) {
                  var dateArray = new Array();
                  var currentDate = startDate;
                  while (currentDate <= stopDate) {
                    dateArray.push(currentDate)
                    currentDate = currentDate.addDays(1);
                  }
                  return dateArray;
                }

              /* Generamos los elementos formateados para el combo de dias */
              $scope.dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
              var hoy = new Date();
              hoy.setHours(0,0,0,0);
              var proxSem = (new Date()).addDays(28);
              proxSem.setHours(0,0,0,0);
                  
              $scope.fechas = getDates(hoy,proxSem);
              $scope.fechasDias = [];
                        
              for (var i = 0; i < $scope.fechas.length; i++ ) {    
                      $scope.fechasDias.push($scope.dias[$scope.fechas[i].getDay()] + " - " + $scope.fechas[i].getDate() + "/" + ($scope.fechas[i].getMonth()+1));    
              }           
                     
             //$scope.filtro.dia=$scope.fechasDias[0];

            })
            .catch(function(e){
               console.log(e);
            })
          })
          .catch(function(e){
             console.log(e);
          })
        })
        .catch(function(e){
           console.log(e);
        })

 /* function list() {
	 Funciones.listado()
     .then(function(datos){
     
        $scope.funciones = datos;

        //Buscamos las funciones del complejo del empleado                
        $scope.funciones = $scope.funciones.filter(function(element){
                                 return (element.complejo.nombre == $rootScope.globals.currentUser.complejo.nombre);
                              });
      
         Generamos campo nuevo con dia formateado en la funcion        
        for (var i = 0; i < $scope.funciones.length; i++ ) {     
          var funciones = $scope.funciones;
          funciones[i].diaFormateado = $scope.dias[new Date(funciones[i].dia).getDay()] + " - " + new Date(funciones[i].dia).getDate() + "/" + (new Date(funciones[i].dia).getMonth()+1);             
        }
             
     }) 
     .catch(function(e){
       console.log(e);
     })
    }*/
 //   $timeout(list, 200);
    
   	 $scope.borrar = function borrar(item) {
    
      var funcionesABorrar = [];

      for (var i = 0; i < item.length; i++) {        
        if(new Date().getTime() <= addMinutes(new Date(item[i].fechaCreacion),1).getTime()) {

          var funcion = $scope.funciones.filter(function(element){
          return (element._id === item[i]._id);
          });             
          funcion = funcion[0];          
          funcionesABorrar.push(funcion);
         
        }else{          
          funcionesABorrar = [];
          alert("Ya no es posible eliminar las funciones");
          break;
        }
      }
     
      for (var i = 0; i < funcionesABorrar.length; i++) {
           Funciones.borrar(funcionesABorrar[i])
           .then(function(datos){
              console.log(datos);                        
           })
           .catch(function(e){
             console.log(e);
           });
      }
      $timeout($scope.reloadPage, 200);   
    }

    $scope.formatear = function(funcion){         
          return funcion.replace(/,/g, " > ");
    }

    $scope.formatearHora = function(funcion){          
      var fecha = new Date(funcion.hora);
      return fecha.getHours() + ":" + (fecha.getMinutes() == "0"? "00" : fecha.getMinutes() < 10? "0"+fecha.getMinutes() : fecha.getMinutes());
    } 

     $scope.alta = function alta() {      
     Datos.cargar(null);
     $location.path('empleadoFuncionesForm');
    }

      $scope.buscarFunciones = function(){
        if($scope.filtro.dia != null){
              console.log($scope.filtro);     
              Funciones.listadoFiltradoMain($scope.filtro)
              .then(function(datos){
                console.log(datos);

                  $scope.funciones = datos;
                  /* Filtramos solo las funciones desde la fecha actual */
                            
              var funcionesDesdeAhora = [];

              for (var i = $scope.funciones.length - 1; i >= 0; i--) {        
                $scope.funciones[i].diaTime = new Date($scope.funciones[i].dia).getTime();

                if(new Date($scope.funciones[i].hora).getTime() >= new Date().getTime()){
                  funcionesDesdeAhora.push($scope.funciones[i]);
                }
              }
              $scope.funciones = funcionesDesdeAhora;
              console.log($scope.funciones);      
              
        })
         .catch(function(e){
           console.log(e);
         })
       }else{
          alert("Ingrese los filtros para la búsqueda");
        }
       }
  
    $scope.filtrarDia = function(){                 
      var indice = $scope.fechasDias.indexOf($scope.filtro.dia);      
      var dia = $scope.fechas[indice];
      
      $scope.filtro.diaLocale = dia.getTime();  

      console.log($scope.filtro);       
    }	
   	       		         	         
    }])
})();