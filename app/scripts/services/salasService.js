angular
  .module('cine')
  .service('SalasService', ['$http', function($http){

    this.listado = listado;
    this.getById = getById;
    this.alta = alta;
    this.modificarAsientos = modificarAsientos;
    this.borrar = borrar;

    function listado () {
      return $http.get('http://localhost:3333/salas/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function getById(texto) {
      return $http.get('http://localhost:3333/salas/id/'+texto)
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }


    function alta(item){
      return $http({
            url: 'http://localhost:3333/salas/insertar',
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

    function modificarAsientos(item){
      return $http({
            url: 'http://localhost:3333/salas/modificarAsientos',
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
            url: 'http://localhost:3333/salas/eliminar',
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
