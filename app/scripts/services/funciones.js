angular
  .module('cine')
  .service('Funciones', ['$http', function($http){

    this.listado = listado;
    this.listadoFiltrado = listadoFiltrado;
    this.listadoFiltradoMain = listadoFiltradoMain;    
    this.listadoFiltradoCajero = listadoFiltradoCajero;
    this.alta = alta;
    this.modificar = modificar;
    this.modificarSala = modificarSala;
    this.modificarComplejo = modificarComplejo;
    this.borrar = borrar;

    function listado () {
      return $http.get('http://localhost:3333/funciones/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }


    function listadoFiltrado(item){
      return $http({
            url: 'http://localhost:3333/funciones/filtrar',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function listadoFiltradoMain(item){
      return $http({
            url: 'http://localhost:3333/funciones/filtrarMain',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function listadoFiltradoCajero(item){
      return $http({
            url: 'http://localhost:3333/funciones/filtrarCajero',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function alta(item){
      return $http({
            url: 'http://localhost:3333/funciones/insertar',
            method: "POST",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function modificar(item){
      return $http({
            url: 'http://localhost:3333/funciones/modificar',
            method: "PUT",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function modificarSala(item){
      return $http({
            url: 'http://localhost:3333/funciones/modificarSala',
            method: "PUT",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function modificarComplejo(item){
      return $http({
            url: 'http://localhost:3333/funciones/modificarComplejo',
            method: "PUT",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function borrar(item){
      return $http({
            url: 'http://localhost:3333/funciones/eliminar',
            method: "DELETE",
            data: item,
            headers: {'Content-Type': 'application/json'}})
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

  }]);
