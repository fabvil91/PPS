angular
  .module('cine')
  .service('Usuarios', ['$http', function($http){

    this.listado = listado;
    this.usuarioPorNombreUsuario = usuarioPorNombreUsuario;
    this.usuarioPorEmail = usuarioPorEmail;
   
    this.alta = alta;
    this.modificar = modificar;
    this.modificarPersonales=modificarPersonales;
    this.modificarTarjeta=modificarTarjeta;
    this.borrar = borrar;
    this.Create = Create;
    this.borrarTarjeta = borrarTarjeta;

    function listado () {
      return $http.get('http://localhost:3333/usuarios/getAll')
      .then(function(rta){
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function usuarioPorNombreUsuario(texto) {
      return $http.get('http://localhost:3333/usuarios/username/'+texto)
      .then(function(rta){
        console.log(rta);
        return rta.data;
      })
      .catch(function(e){
        return e;
      })
    }

     function usuarioPorEmail(texto) {
      return $http.get('http://localhost:3333/usuarios/email/'+texto)
      .then(function(rta){
        console.log(rta);
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
            url: 'http://localhost:3333/usuarios/modificar',
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
    function modificarPersonales(item){
      return $http({
            url: 'http://localhost:3333/usuarios/modificarPersonales',
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
            url: 'http://localhost:3333/usuarios/modificarTarjeta',
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

    function borrarTarjeta(item){
      return $http({
            url: 'http://localhost:3333/usuarios/borrarTarjeta',
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
            url: 'http://localhost:3333/usuarios/eliminar',
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
