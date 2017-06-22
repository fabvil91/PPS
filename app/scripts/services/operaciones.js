angular
  .module('cine')
  .service('Operaciones', ['$http', function($http){

    this.listado = listado;
    this.operacionPorCodigo = operacionPorCodigo;
    this.operacionPorCodigoUser = operacionPorCodigoUser;
    this.articuloPrecioMayor = articuloPrecioMayor;
    this.articuloPorProveedor = articuloPorProveedor;
    this.articuloPorIndice = articuloPorIndice;
    this.alta = alta;
    this.modificar = modificar;
    this.modificarEfectivo = modificarEfectivo;
    this.modificarCompra = modificarCompra; 
    this.modificarTarjeta = modificarTarjeta;
    this.borrar = borrar;

    function listado () {
      return $http.get('http://localhost:3333/operaciones/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function operacionPorCodigo(texto) {
      return $http.get('http://localhost:3333/operaciones/codigo/'+texto)
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function operacionPorCodigoUser(texto) {
      return $http.get('http://localhost:3333/operaciones/codigoUser/'+texto)
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
            url: 'http://localhost:3333/operaciones/insertar',
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

     function modificarEfectivo(item){
      return $http({
            url: 'http://localhost:3333/operaciones/modificarEfectivo',
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

     function modificarCompra(item){
      return $http({
            url: 'http://localhost:3333/operaciones/modificarCompra',
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

     function modificarTarjeta(item){
      return $http({
            url: 'http://localhost:3333/operaciones/modificarTarjeta',
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
            url: 'http://localhost:3333/eliminar',
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
