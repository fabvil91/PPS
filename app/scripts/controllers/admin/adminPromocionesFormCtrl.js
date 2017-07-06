(function(){
	'use strict';
	angular.module('cine')
	.controller('adminPromocionesFormCtrl', ['$rootScope','$scope','Datos','$sce','Bancos','Precios','Tarjetas','Promociones','$location',
	function($rootScope,$scope,Datos,$sce,Bancos,Precios,Tarjetas,Promociones,$location){									
        $scope.slide = {};
		$scope.tipoPromocion=["Dia","Tarjeta"];
		$scope.tipoDescuento=["2x1","Porcentaje"];
		$scope.dia = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
		$scope.tipoPrecios=[];
		$scope.preciosFiltrados=[];

		

       Bancos.listado()
	    .then(function(datos){
	     console.log(datos);
	     $scope.bancos = datos; 
		 Tarjetas.listado()
		 .then(function(datos){
	     console.log(datos);
	     $scope.tarjetas = datos; 
		 Precios.listado()
		 .then(function(datos){
	     $scope.precios = datos;
		 console.log($scope.precios);

		 	filtrarPrecios();

			if(Datos.listado() == null){
			console.log('alta ' + Datos.listado());
			$scope.cargar = cargar;
								
			function cargar() {   
				console.log($scope.slide);
				if($scope.promocion.tipoPromocion=="Tarjeta"){
				var banco = $scope.bancos.filter(function(element){
				return (element._id === $scope.promocion.banco._id);
			});
			var tarjeta = $scope.tarjetas.filter(function(element){
				return (element._id === $scope.promocion.tarjeta._id);
				});

				$scope.promocion.banco = banco[0];
				$scope.promocion.tarjeta = tarjeta[0];
			}
			if($scope.promocion.tipoPromocion=="Dia"){
				$scope.dia.forEach(function(item,index){
					
					if((item)==$scope.promocion.diaSemana){
						$scope.promocion.diaSemana = index+1;
					}
				});
			}

			Promociones.alta($scope.promocion)
			.then(function(datos){
				console.log(datos);
			})
			.catch(function(e){
				console.log(e);
			});
						
				$location.path('adminPromociones');
			}

		}else{
				console.log('modificar' + Datos.listado());  
				$scope.cargar = cargar;
				
				
				$scope.promocion = Datos.listado();
				$scope.promocion.diaSemana=$scope.formatearDia($scope.promocion.diaSemana);	    	    	   	    
				
				function cargar() {

					if($scope.promocion.tipoPromocion=="Tarjeta"){
				var banco = $scope.bancos.filter(function(element){
				return (element._id === $scope.promocion.banco._id);
			});
			var tarjeta = $scope.tarjetas.filter(function(element){
				return (element._id === $scope.promocion.tarjeta._id);
				});

				$scope.promocion.banco = banco[0];
				$scope.promocion.tarjeta = tarjeta[0];
			}
			if($scope.promocion.tipoPromocion=="Dia"){
				$scope.dia.forEach(function(item,index){
					
					if((item)==$scope.promocion.diaSemana){
						$scope.promocion.diaSemana = index+1;
					}
				});
			}

				Promociones.modificar($scope.promocion)
					.then(function(datos){
					console.log(datos);
					})
					.catch(function(e){
					console.log(e);
				});

				Datos.limpiar(); 
				
				$location.path('adminPromociones');
				}
		}
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


	   function filtrarPrecios(){
		
		 $scope.precios.forEach(function(item){
			$scope.tipoPrecios.push(item.tipo);			
		 });
		 
		 console.log($scope.tipoPrecios);
		$scope.preciosFiltrados = $scope.tipoPrecios.filter(function(item, pos) {
			return $scope.tipoPrecios.indexOf(item) == pos;
		})
		$scope.preciosFiltrados.push("Todas");
		console.log($scope.preciosFiltrados);
	   }

	   $scope.formatearDia=function(num){
       var ret="";
      $scope.dia.forEach(function(item,index){
        
        if((index+1)==num){
          ret= item;
        }
      });
      return ret;
     }
    }])
})();

