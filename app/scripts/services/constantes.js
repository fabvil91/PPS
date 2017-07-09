angular
  .module('cine')
  .service('Constantes', ['$http', function($http){

    this.listado = listado;
    this.alta = alta;
    this.modificar = modificar;
    this.borrar = borrar;

    function listado () {
      return $http.get('http://localhost:3333/constantes/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function alta(item){
      return $http({
            url: 'http://localhost:3333/precios/insertar',
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
            url: 'http://localhost:3333/constantes/modificar',
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
            url: 'http://localhost:3333/precios/eliminar',
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
