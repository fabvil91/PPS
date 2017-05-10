angular
  .module('cine')
  .factory('Datos', [function(){
    var data = null;
    
    return {
      listado : listado,
      cargar: cargar,
      borrar: borrar,
      limpiar: limpiar
    }

    function cargar(objeto){    
      console.log(objeto);
      data = objeto;
    }

    function listado(){
      console.log(data);
      return data;
    }

    function limpiar(){
      data = null;
    }

    function borrar(item) {
      var pos = data.indexOf(item);
      return data.splice(pos, 1);
    }
  }]);
