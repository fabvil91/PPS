angular
  .module('cine')
  .service('Precios', ['$http', function($http){

    this.listado = listado;
    this.articuloPorNombre = articuloPorNombre;
    this.articuloPrecioMayor = articuloPrecioMayor;
    this.articuloPorProveedor = articuloPorProveedor;
    this.articuloPorIndice = articuloPorIndice;
    this.alta = alta;
    this.modificar = modificar;
    this.borrar = borrar;

    function listado () {
      return $http.get('http://localhost:3333/precios/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function articuloPorNombre(texto) {
      return $http.get('http://localhost:3333/articulos/name/'+texto)
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function articuloPrecioMayor(texto) {
      return $http.get('http://localhost:3333/articulos/precio/'+texto)
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function articuloPorProveedor(texto) {
      return $http.get('http://localhost:3333/articulos/proveedor/'+texto)
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

    function articuloPorIndice(texto) {
      return $http.get('http://localhost:3333/articulos/indices/'+texto)
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
            url: 'http://localhost:3333/precios/modificar',
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
