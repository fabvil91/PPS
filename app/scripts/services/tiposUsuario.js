angular
  .module('cine')
  .service('TiposUsuario', ['$http', function($http){

    this.listado = listado;
    this.tiposUsuarioPorNombre = tiposUsuarioPorNombre;
    this.articuloPrecioMayor = articuloPrecioMayor;
    this.articuloPorProveedor = articuloPorProveedor;
    this.articuloPorIndice = articuloPorIndice;
    this.alta = alta;
    this.modificar = modificar;
    this.borrar = borrar;
    this.Create = Create;

    function listado () {
      return $http.get('http://localhost:3333/tiposUsuario/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function tiposUsuarioPorNombre(texto) {
      return $http.get('http://localhost:3333/tiposUsuario/nombre/'+texto)
      .then(function(rta){
        console.log(rta);
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
            url: 'http://localhost:3333/usuarios/insertar',
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
            url: 'http://localhost:3333/modificar',
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

    function Create(user) {
          
      return usuarioPorNombreUsuario(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser.data) {
                            console.log("duplicateUser");
                            return { success: false, message: 'Nombre de usuario "' + user.username + '" ya fue registrado' };
                        } else {

                           return alta(user)
                            .then(function(rta){
                              console.log(rta);
                              return { success: true };
                            })
                        }
                    })
                    .catch(function(e){
                        console.log(e);
                       return e;
                    })
   }

}]);
