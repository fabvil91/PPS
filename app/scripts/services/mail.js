angular
  .module('cine')
  .service('Mail', ['$http', function($http){


   
    this.enviar = enviar;
    this.enviarContrasenia = enviarContrasenia;
    this.enviarCancelarOperacion=enviarCancelarOperacion;
    this.enviarCompra=enviarCompra;
    this.enviarEntraListaNegra=enviarEntraListaNegra;
    this.enviarReserva=enviarReserva;
    this.enviarSaleListaNegra=enviarSaleListaNegra;

    function enviar(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarContactanos',
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

     function enviarContrasenia(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarContrasenia',
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
    function enviarCancelarOperacion(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarCancelarOperacion',
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
      function enviarCompra(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarCompra',
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
     function enviarEntraListaNegra(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarEntraListaNegra',
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

     function enviarReserva(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarReserva',
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
      function enviarSaleListaNegra(item){
      return $http({
            url: 'http://localhost:3333/mail/enviarSaleListaNegra',
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




}]);
